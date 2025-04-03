sap.ui.define([
    "./BaseController",
    "sap/ui/core/mvc/Controller",
    "../service/ServiceHDB",
    "../lib/underscore3",
	"sap/m/MessageBox",
],
    function (BaseController, Controller, service, underscore3, MessageBox) {
        "use strict";
        var canvas;
        var oThat;
        var local = true;
        const deleteIcon = "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";
        return BaseController.extend("zproject.maestrorep.controller.Detail", {
            onInit: function () {

                //	this.byId("idHTMLContent").setContent("<canvas id='canvas' name='canvas' width='400' height='300' style='border:1px solid #ccc'></canvas>");
                // this.byId("idHTMLContent2").setContent("<button id='add' onclick='Add()'>Add a rectangle</button>"); 

            },
            onAfterRendering: async function () {

                oThat = this;
                var oRouter = this.getOwnerComponent().getRouter();
                this.localModel = this.getView().getModel("localModel");
                local ? this.repuestosmodel = this.getView().getModel("repuestosmodelLocal") : this.repuestosmodel = this.getView().getModel("repuestosmodel");
                // oRouter.getRoute("TargetHome").attachMatched(async function(oEvent) {
                // 	var test = 1;
                // }, this);

                oThat.onFrgProveedores = sap.ui.xmlfragment("zproject.maestrorep.view.Fragments.AddProveedores", oThat);
                oThat.getView().addDependent(oThat.onFrgProveedores);
                oThat.onFrgMaquinas = sap.ui.xmlfragment("zproject.maestrorep.view.Fragments.AddMaquinas", oThat);
                oThat.getView().addDependent(oThat.onFrgMaquinas);
                oThat.onFrgMateriales = sap.ui.xmlfragment("zproject.maestrorep.view.Fragments.AddMateriales", oThat);
                oThat.getView().addDependent(oThat.onFrgMateriales);
                oThat.onFrgRepuestos = sap.ui.xmlfragment("zproject.maestrorep.view.Fragments.AddRepuestos", oThat);
                oThat.getView().addDependent(oThat.onFrgRepuestos);
                oThat.onFrgFluidos = sap.ui.xmlfragment("zproject.maestrorep.view.Fragments.AddFluidos", oThat);
                oThat.getView().addDependent(oThat.onFrgFluidos);
                oThat.onFrgAdjuntos = sap.ui.xmlfragment("zproject.maestrorep.view.Fragments.AddAdjuntosMaq", oThat);
                oThat.getView().addDependent(oThat.onFrgAdjuntos);

                //   that.onFrgProveedores.open();
            },
            onAgregarNuevoRegistro: function (oEvent) {
                let getSelData = this.localModel.getData();
                if (getSelData.oDataSelected.Code === "Prov") {
                    this.onFrgProveedores.open();
                } else if (getSelData.oDataSelected.Code === "Maq") {
                    this.onFrgMaquinas.open();
                } else if (getSelData.oDataSelected.Code === "Mate") {
                    this.onFrgMateriales.open();
                } else if (getSelData.oDataSelected.Code === "Rep") {
                    this.onFrgRepuestos.open();
                } else if (getSelData.oDataSelected.Code === "Flu") {
                    this.onFrgFluidos.open();
                }
            },
            onCloseProveedores: function (oEvent) {
                this.onFrgProveedores.close();
            },
            onCloseMaquinas: function (oEvent) {
                this.onFrgMaquinas.close();
            },
            onCloseMateriales: function (oEvent) {
                this.onFrgMateriales.close();
            },
            onCloseRepuestos: function (oEvent) {
                this.onFrgRepuestos.close();
            },
            onCloseFluidos: function (oEvent) {
                this.onFrgFluidos.close();
            },
            onOpenAdjuntos: function(){
                this.onFrgAdjuntos.open();
            },
            onCloseAdjuntos: function(){
                this.onFrgAdjuntos.close();
            },

            onGuardarProveedor: async function (oEvent) {
                try{
                    let getNewProv = this.localModel.getData().oNewProveedor;
                    let oProveedores = {
                        "nombre": getNewProv.tNombre,
                        "contacto": getNewProv.tContacto,
                        "telefono": getNewProv.tTelefono,
                        "email": getNewProv.tEmail,
                        "direccion": getNewProv.tDireccion
                    };
                    let getRespuestaCreate = await service.onPostPutGeneral(this.repuestosmodel, "/Proveedores", oProveedores, "POST");
                    debugger;
                }catch(e){
                    MessageBox.warning("Ocurrió un error al guardar los datos.");
                }
            },
            onGuardarMaquinas: async function (oEvent) {
                try{
                    let getNewMaquinas = this.localModel.getData().oNewMaquinas;
                    let oMaquinas = {
                        "marca": getNewMaquinas.tMarca,
                        "modelo": getNewMaquinas.tModelo,
                        "anioFabricacion": getNewMaquinas.tAnioFab,
                        "color": getNewMaquinas.tColor,
                        "numeroSerie": getNewMaquinas.tNumSerie,
                        "tipoMotor": getNewMaquinas.tTipMotor,
                        "capacidadTanque": getNewMaquinas.tCapTanque
                    };
                    let getRespuestaCreate = await service.onPostPutGeneral(this.repuestosmodel, "/Maquinas", oMaquinas, "POST");
                    debugger;
                }catch(e){
                    MessageBox.warning("Ocurrió un error al guardar los datos.");
                }
            },

            //FALTAN LOS OTROS 3

            onGuardarMateriales: async function (oEvent) {
                try{
                    let getNewMate = this.localModel.getData().oNewMateriales;
                    let oProveedores = {
                        "nombre": getNewMate.matNombre,
                        "tipo": getNewMate.matTipo,
                        "codigo_material": getNewMate.matCodMate,
                        "marca": getNewMate.matMarca,
                        "granulometria": getNewMate.matGranulometria,
                        "compatibilidad": getNewMate.matCompatibilidad,
                        "unidad_medida": getNewMate.matUnidadMedida,
                        "proveedoresId": {
                            "ID": getNewMate.matProveedores
                        }
                    };
                    let getRespuestaCreate = await service.onPostPutGeneral(this.repuestosmodel, "/Materiales", oProveedores, "POST");
                    debugger;
                }catch(e){
                    MessageBox.warning("Ocurrió un error al guardar los datos.");
                }
            },
            onGuardarRepuestos: async function (oEvent) {
                try{
                    let getNewRep = this.localModel.getData().oNewRepuestos;
                    let oProveedores = {
                        "nombre": getNewRep.repNombre,
                        "categoria": getNewRep.repCategoría,
                        "codigo_repuesto": getNewRep.repCodRepuesto,
                        "marca": getNewRep.repMarcao,
                        "numero_parte": getNewRep.repNumParte,
                        "unidad_medida": getNewRep.repUM,
                        "proveedoresId": getNewMate.repProveedores
                    };
                    let getRespuestaCreate = await service.onPostPutGeneral(this.repuestosmodel, "/Repuestos", oProveedores, "POST");
                    debugger;
                }catch(e){
                    MessageBox.warning("Ocurrió un error al guardar los datos.");
                }
            },
            onGuardarFluidos: async function (oEvent) {
                try{
                    let getNewFlu = this.localModel.getData().oNewFluidos;
                    let oProveedores = {
                        "nombre": getNewFlu.fluNombre,
                        "tipo": getNewFlu.fluTipo,
                        "codigo_fluido": getNewFlu.fluCodFluido,
                        "viscosidad_grado": getNewFlu.fluGraVisco,
                        "marca": getNewFlu.fluMarca,
                        "compatibilidad": getNewFlu.fluCompa,
                        "unidad_medida": getNewFlu.fluUM,
                        "fecha_expiracion": getNewFlu.fluFecExpira,
                        "proveedores_ID": getNewFlu.fluProveedor
                    };
                    let getRespuestaCreate = await service.onPostPutGeneral(this.repuestosmodel, "/Fluidos", oProveedores, "POST");
                    debugger;
                }catch(e){
                    MessageBox.warning("Ocurrió un error al guardar los datos.");
                }
            },
            onDelete: async function(oEvent){
                let getDataEnt = this.localModel.getData().oDataSelected.tEntidad;
                let getLineaSel = oEvent.getSource().getBindingContext("localModel").getObject();

                let oDeleteData = await service.onPostPutGeneral(this.repuestosmodel, "/"+getDataEnt, getLineaSel , "DELETE");
            }



        });
    });
