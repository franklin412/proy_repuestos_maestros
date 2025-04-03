sap.ui.define(
    [
        "sap/ui/core/mvc/Controller"
    ],
    function(BaseController) {
      "use strict";
  
      return BaseController.extend("zproject.maestrorep.controller.App", {
        onInit: function() {
          // this.oRouter = this.getOwnerComponent().getRouter();
          // this.oRouter.attachRouteMatched(this.onRouteMatched, this);
          // this.oRouter.attachBeforeRouteMatched(this.onBeforeRouteMatched, this);
          // // Navigating to a random product in order to display two columns initially
          // this.oRouter.navTo("detail", {layout: "TwoColumnsMidExpanded", product: "95"});
        },
        onAfterRendering: function(){
          this.oRouter = this.getOwnerComponent().getRouter();
          this.oRouter.attachRouteMatched(this.onRouteMatched, this);
          // this.oRouter.attachBeforeRouteMatched(this.onBeforeRouteMatched, this);
          // Navigating to a random product in order to display two columns initially
          // this.oRouter.navTo("detail", {layout: "TwoColumnsMidExpanded"});
          var oModel = this.getOwnerComponent().getModel("localModel");
          oModel.setProperty("/layout", "TwoColumnsMidExpanded");
        },

        onBeforeRouteMatched: function(oEvent) {
    
          var oModel = this.getOwnerComponent().getModel("localModel");
    
          var sLayout = oEvent.getParameters().arguments.layout;
    
          // If there is no layout parameter, query for the default level 0 layout (normally OneColumn)
          if (!sLayout) {
            var oNextUIState = this.getOwnerComponent().getHelper().getNextUIState(0);
            sLayout = oNextUIState.layout;
          }
    
          // Update the layout of the FlexibleColumnLayout
          if (sLayout) {
            oModel.setProperty("/layout", sLayout);
          }
        },
    
        onRouteMatched: function (oEvent) {
          var sRouteName = oEvent.getParameter("name"),
            oArguments = oEvent.getParameter("arguments");
    
          this._updateUIElements();
    
          // Save the current route name
          this.currentRouteName = sRouteName;
          this.currentProduct = oArguments.product;
          this.currentSupplier = oArguments.supplier;
        },
    
        onStateChanged: function (oEvent) {
          var bIsNavigationArrow = oEvent.getParameter("isNavigationArrow"),
            sLayout = oEvent.getParameter("layout");
    
          this._updateUIElements();
    
          // Replace the URL with the new layout if a navigation arrow was used
          if (bIsNavigationArrow) {
            this.oRouter.navTo(this.currentRouteName, {layout: sLayout, product: this.currentProduct, supplier: this.currentSupplier}, true);
          }
        },
    
        // Update the close/fullscreen buttons visibility
        _updateUIElements: function () {
          var oModel = this.getOwnerComponent().getModel("localModel");
          // var oUIState = this.getOwnerComponent().getHelper().getCurrentUIState();
          // oModel.setData(oUIState);
        },
      });
    }
  );
  