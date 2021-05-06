import { useEffect } from "react";
import L from "leaflet";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./search.css";
import { useMap } from "react-leaflet";

const SearchFunc = ({ sitesArr: { sites } }) => {
  const map = useMap();

  useEffect(() => {
    // console.log(sites);
    searchFunc();
    // eslint-disable-next-line
  }, [sites]);

  const searchFunc = () => {
    const formInput = document.querySelector(".formSearchOnMap");
    const formSortedOpt = document.querySelector(".siteFilterdList");
    formInput.addEventListener("keyup", (e) => {
      const searchString = e.target.value.toUpperCase();
      const filteredSites = sites.filter((site) => {
        return site.site_name.includes(searchString);
      });
      const top5 = filteredSites.slice(Math.max(filteredSites.length - 5, 0));
      formSortedOpt.innerHTML = top5
        .map((el) => {
          return `<li
              className = "filterItem" value= '${[el.latitude, el.longitude]}' >
              ${el.site_name}
              </li>`;
        })
        .join("");
    });

    formSortedOpt.addEventListener("click", (e) => zoomToSite(e));
  };

  const zoomToSite = (coordinates) => {
    const latlng = L.latLng(
      coordinates.target.attributes.value.nodeValue.split(",")
    );
    map.setView(latlng, 20);
  };

  return null;
};
SearchFunc.prototype = {
  sitesArr: PropTypes.object.isRequired,
};

const siteArrToProps = (state) => ({
  sitesArr: state.sitesArr,
});

export default connect(siteArrToProps)(SearchFunc);
