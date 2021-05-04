import L from "leaflet";
import { useMap } from "react-leaflet";
import "font-awesome/css/font-awesome.min.css";
import "./searchControlers.css";

export default function SearchControlers() {
  const map = useMap();

  L.Control.Search = L.Control.extend({
    options: {
      position: "topleft",
      collapsed: "true",
    },
    /*
     * Leaflet calls the onAdd function when the control is added to the map:
     *
     *   control.addTo(map);
     *   map.addControl(control);
     */
    onAdd: function (map) {
      /*
       * Create the DOM element that will contain the control. The leaflet-control-template
       * CSS class is defined in the LeafletControlTemplate.css file.
       */

      const controlElementTag = "input";
      const controlElementClass = "leaflet-control-Search";
      const controlElement = L.DomUtil.create(
        controlElementTag,
        controlElementClass
      );
      controlElement.type = "button";
      controlElement.style.width = "30px";
      controlElement.style.height = "30px";
      // Continue implementing the control here.

      /*
       * The onAdd function must return the DOM element that contains the plugin
       * control. Leaflet will add this element to the map.
       */

      controlElement.onmouseover = function () {
        controlElement.style.width = "100px";
        controlElement.type = "input";
      };

      controlElement.onmouseout = function () {
        controlElement.style.width = "30px";
        controlElement.value = " ";
        controlElement.type = "button";
      };
      return controlElement;
    },
    /*
     * Leaflet calls the onRemove function when a control is removed from the map:
     *
     *   control.removeFrom(map);
     *   map.removeControl(control);
     */
    onRemove: function (map) {
      // Nothing to do here
    },
  });
  /*
   * The standard Leaflet plugin creation pattern is to implement a factory function that
   * enables the creation of the plugin to be chained with other function calls:
   *
   *   L.leafletControlTemplate().addTo(map);
   *
   * The common convention is to name the factory function after the class of the control
   * plugin but make the first letter lower case.
   */
  L.control.Search = function (options) {
    return new L.Control.Search(options);
  };

  L.control.Search().addTo(map);
  return null;
}
