sap.ui.define([
	"./BaseController",
	"sap/ui/core/mvc/Controller",
	"../service/ServiceHDB",
	"../lib/underscore3"
],
	function (BaseController, Controller, service, underscore3) {
		"use strict";
		var canvas;
		var oThat;
		var local = true;
		const deleteIcon = "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";
		return BaseController.extend("zproject.maestrorep.controller.Home", {
			onInit: function () {

				//	this.byId("idHTMLContent").setContent("<canvas id='canvas' name='canvas' width='400' height='300' style='border:1px solid #ccc'></canvas>");
				// this.byId("idHTMLContent2").setContent("<button id='add' onclick='Add()'>Add a rectangle</button>"); 

			},
			onAfterRendering: async function () {

				oThat = this;


				this.oRouter = this.getOwnerComponent().getRouter();
				this.localModel = this.getView().getModel("localModel");
				local ? this.repuestosmodel = this.getView().getModel("repuestosmodelLocal") : this.repuestosmodel = this.getView().getModel("repuestosmodel");
				let oUsuarioFilter = await service.onConsultaDatosBD(this.repuestosmodel, "/Maquinas");
				// let segundaconsulta = await service.onConsultaDatosBD(this.repuestosmodel, "/READSET", []);
				let test = 1;

			},
			onNavigateDetail: async function (oEvent) {
				let getObj = oEvent.getSource().getBindingContext("localModel").getObject();
				let tipoTablaDetalle;
				this.localModel.setProperty("/oDataSelected", getObj);
				this.onModifVisibleDetail(getObj);
				await this.getProveedores();
				let setEntityExpand = getObj.tEntidad === "Materiales" || getObj.tEntidad === "Repuestos" || getObj.tEntidad === "Fluidos" ? "proveedoresId" : "";
				let aTablaMain = await service.onConsultaDatosBD(this.repuestosmodel, "/" + getObj.tEntidad, setEntityExpand );
				
				getObj.tEntidad === "Proveedores" ? tipoTablaDetalle = "aTableMainProv" : null;
				getObj.tEntidad === "Maquinas" ? tipoTablaDetalle = "aTableMainMaq" : null;
				getObj.tEntidad === "Materiales" ? tipoTablaDetalle = "aTableMainMate" : null;
				getObj.tEntidad === "Repuestos" ? tipoTablaDetalle = "aTableMainRep" : null;
				getObj.tEntidad === "Fluidos" ? tipoTablaDetalle = "aTableMainFlu" : null;

				this.localModel.setProperty("/" + tipoTablaDetalle, aTablaMain.results);
				this.oRouter.navTo("detail", { layout: "TwoColumnsMidExpanded" });
			},
			getProveedores: async function () {
				let aProveedores = await service.onConsultaDatosBD(this.repuestosmodel, "/Proveedores");
				this.localModel.setProperty("/aProveedores", aProveedores.results.length > 0 ? aProveedores.results : []);
				debugger;
			},
			onModifVisibleDetail: function (getObj) {
				let refreshVisDet = {
					"Proveedores": false,
					"Maquinas": false,
					"Materiales": false,
					"Repuestos": false,
					"Fluidos": false
				};
				this.localModel.setProperty("/visDetalle", refreshVisDet);
				this.localModel.getData().visDetalle[getObj.tEntidad] = true;
				this.localModel.refresh(true);
			}

		});
	});
