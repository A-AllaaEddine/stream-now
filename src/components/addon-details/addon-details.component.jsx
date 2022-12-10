import "./addon-details.styles.scss";

const AddonDetails = ({
  selectedAddon,
  triggered,
  setTriggered,
  existing,
  installAddon,
  uninstallAddon,
}) => {
  const { data, addonUrl } = selectedAddon;
  const handleClick = (event) => {
    if (event.target === event.currentTarget) {
      setTriggered(!triggered);
    }
  };

  const navigateToConfigure = () => {
    const url = addonUrl.replace("manifest.json", "configure");
    window.location.href = url;
  };

  // console.log(selectedAddon);
  return (
    <div
      className={`${triggered ? "triggered" : ""} popup-display`}
      onClick={handleClick}
    >
      <div
        style={
          data && data.background
            ? {
                backgroundImage: `url(${data.background})`,
              }
            : { backgroundColor: "#0E2C4B" }
        }
        className={`${triggered ? "triggered" : ""} display`}
      >
        <div
          style={
            data && !data.background
              ? { backgroundColor: "rgba(0, 0, 0, 0.1)" }
              : {}
          }
          className="img-background"
        >
          <div className="addon-details-logo-container">
            <img src={data && data.logo} alt="addon logo" />
            <div className="addon-name-version">
              <p className="addon-name">{data && data.name}</p>
              <p className="addon-version">{data && data.version}</p>
            </div>
          </div>
          <div className="addon-details-info">
            <p className="addon-details-description">
              {data && data.description}
            </p>
          </div>
        </div>
        <div className="addon-buttons-container">
          {existing ? (
            <button
              className="addon-uninstall"
              onClick={() => uninstallAddon(addonUrl)}
            >
              Uninstall
            </button>
          ) : data &&
            data.behaviorHints.configurationRequired === true ? null : (
            <button
              className="addon-install"
              onClick={() => installAddon(addonUrl)}
            >
              Install
            </button>
          )}
          {data &&
          data.behaviorHints &&
          data.behaviorHints.configurable === true ? (
            <button className="addon-configure" onClick={navigateToConfigure}>
              Configure
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default AddonDetails;
