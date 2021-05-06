import React, { useEffect, useState } from "react";
import L from "leaflet";
import { useMap } from "react-leaflet";
import "font-awesome/css/font-awesome.min.css";
import "./search.css";
import ReactDOMServer from "react-dom/server";
import { AiOutlineSearch } from "react-icons/ai";
import SearchFunc from "./SearchFunc";

const SearchControlers = () => {
  const [mounted, setMounted] = useState(false);

  const map = useMap();

  useEffect(() => {
    const searchIcon = () => {
      L.Control.Search = L.Control.extend({
        options: {
          position: "topleft",
          collapsed: "true",
        },

        onAdd: function (map) {
          const controlElementTag = "div";
          const controlElementClass = "leaflet-control-Search";
          const controlElement = L.DomUtil.create(
            controlElementTag,
            controlElementClass
          );

          //Search Icon
          const iconSearch = ReactDOMServer.renderToString(
            <AiOutlineSearch size={30} className="searchIcon" />
          );

          //Create Search Icon
          const input = document.createElement("i");
          input.innerHTML = iconSearch;
          input.className = "searchIconBox";
          controlElement.appendChild(input);
          const formInput = document.createElement("input");
          formInput.type = "form";
          formInput.className = "formSearchOnMap";
          controlElement.appendChild(formInput);
          const siteFilterdList = document.createElement("ui");
          siteFilterdList.className = "siteFilterdList";
          controlElement.appendChild(siteFilterdList);

          controlElement.onmouseover = function () {
            input.style.display = "none";
            formInput.style.display = "block";
          };

          controlElement.onmouseout = function () {
            if (formInput.value === "") {
              input.style.display = "flex";
              formInput.style.display = "none";
              siteFilterdList.innerHTML = "";
            }
          };
          setMounted(true);
          return controlElement;
        },

        onRemove: function (map) {
          // Nothing to do here
        },
      });

      L.control.Search = function (options) {
        return new L.Control.Search(options);
      };

      L.control.Search().addTo(map);
      return null;
    };

    searchIcon();
    return () => {
      return null;
    };
    // eslint-disable-next-line
  }, [map]);

  return mounted && <SearchFunc />;
};

export default SearchControlers;
