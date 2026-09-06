/**
 * Генерує JSON контейнера GTM для імпорту (Admin → Import Container → Merge).
 *
 *   node scripts/gtm-container.mjs G-XXXXXXXXXX > gtm-container.json
 *
 * Що всередині:
 *  - Google tag (GA4) з Measurement ID — на всіх сторінках
 *  - GA4 event tags для подій із dataLayer сайту:
 *      form_submit (form_name), form_error (form_name),
 *      request_quote_click (product), phone_click (location), email_click (location)
 *  - dataLayer-змінні для параметрів
 *  - тригери Custom Event на кожну подію
 */
const measurementId = process.argv[2];
if (!measurementId || !/^G-[A-Z0-9]+$/.test(measurementId)) {
  console.error("Usage: node scripts/gtm-container.mjs G-XXXXXXXXXX");
  process.exit(1);
}

let id = 1;
const next = () => String(id++);

const events = [
  { name: "form_submit", params: ["form_name"] },
  { name: "form_error", params: ["form_name"] },
  { name: "request_quote_click", params: ["product"] },
  { name: "phone_click", params: ["location"] },
  { name: "email_click", params: ["location"] },
];

const paramNames = [...new Set(events.flatMap((e) => e.params))];

const variables = paramNames.map((p) => ({
  variableId: next(),
  name: `dlv - ${p}`,
  type: "v",
  parameter: [
    { type: "INTEGER", key: "dataLayerVersion", value: "2" },
    { type: "BOOLEAN", key: "setDefaultValue", value: "false" },
    { type: "TEMPLATE", key: "name", value: p },
  ],
}));
const varRef = (p) => `{{dlv - ${p}}}`;

const triggers = events.map((e) => ({
  triggerId: next(),
  name: `CE - ${e.name}`,
  type: "CUSTOM_EVENT",
  customEventFilter: [
    {
      type: "EQUALS",
      parameter: [
        { type: "TEMPLATE", key: "arg0", value: "{{_event}}" },
        { type: "TEMPLATE", key: "arg1", value: e.name },
      ],
    },
  ],
}));

const googleTag = {
  tagId: next(),
  name: "Google tag - GA4",
  type: "googtag",
  parameter: [{ type: "TEMPLATE", key: "tagId", value: measurementId }],
  firingTriggerId: ["2147479553"], // All Pages (built-in)
  tagFiringOption: "ONCE_PER_EVENT",
};

const eventTags = events.map((e, i) => ({
  tagId: next(),
  name: `GA4 - ${e.name}`,
  type: "gaawe",
  parameter: [
    { type: "TEMPLATE", key: "eventName", value: e.name },
    { type: "TEMPLATE", key: "measurementIdOverride", value: measurementId },
    {
      type: "LIST",
      key: "eventSettingsTable",
      list: e.params.map((p) => ({
        type: "MAP",
        map: [
          { type: "TEMPLATE", key: "parameter", value: p },
          { type: "TEMPLATE", key: "parameterValue", value: varRef(p) },
        ],
      })),
    },
  ],
  firingTriggerId: [triggers[i].triggerId],
  tagFiringOption: "ONCE_PER_EVENT",
}));

const container = {
  exportFormatVersion: 2,
  exportTime: new Date().toISOString().replace("T", " ").slice(0, 19),
  containerVersion: {
    path: "accounts/0/containers/0/versions/0",
    accountId: "0",
    containerId: "0",
    containerVersionId: "0",
    container: {
      path: "accounts/0/containers/0",
      accountId: "0",
      containerId: "0",
      name: "co2lab.pro",
      publicId: "GTM-XXXXXXX",
      usageContext: ["WEB"],
    },
    tag: [googleTag, ...eventTags],
    trigger: triggers,
    variable: variables,
    builtInVariable: [
      { type: "EVENT", name: "Event" },
      { type: "PAGE_URL", name: "Page URL" },
      { type: "PAGE_PATH", name: "Page Path" },
    ],
  },
};

process.stdout.write(JSON.stringify(container, null, 2));
