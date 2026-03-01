// ISDA Soil API helper function for GooeyAI function steps.
// Expects input: { lat, long }
// Requires env var: ISDA_API_KEY
async ({ lat, long }) => {
  const apiKey = process.env.ISDA_API_KEY;

  if (!apiKey) {
    throw new Error("Missing ISDA_API_KEY environment variable");
  }

  const properties = [
    "nitrogen_total",
    "phosphorous_extractable",
    "potassium_extractable",
    "ph",
    "texture_class"
  ];

  const fetchData = async (property) => {
    const url = `https://api.isda-africa.com/v1/soilproperty?key=${apiKey}&lat=${lat}&lon=${long}&property=${property}&depth=0-20`;
    const response = await fetch(url);
    const data = await response.json();
    return { [property]: data };
  };

  const resultsArray = await Promise.all(properties.map(fetchData));
  const mergedResults = Object.assign({}, ...resultsArray);

  const condensed = {};
  for (const property of properties) {
    const propData = mergedResults[property]?.property?.[property]?.[0]?.value;
    if (propData) {
      const value = propData.value;
      const unit = propData.unit || "";
      condensed[property] = `${value} ${unit}`.trim();
    } else {
      condensed[property] = "N/A";
    }
  }

  return condensed;
};
