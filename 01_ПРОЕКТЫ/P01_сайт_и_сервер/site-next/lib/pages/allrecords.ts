export type AllrecordsAttrs = {
  className: string;
  dataHook: string;
  dataTildaProjectId: string;
  dataTildaPageId: string;
  dataTildaFormskey: string;
  dataTildaCookie: string;
  dataTildaLazy: string;
  dataTildaProjectLang: string;
  dataTildaRootZone: string;
  dataTildaProjectCountry: string;
  dataTildaPageAlias?: string;
};

export function getPageAllrecordsAttrs(body: string): AllrecordsAttrs {
  const match = body.match(/<div id="allrecords"([^>]+)>/);
  const defaults: AllrecordsAttrs = {
    className: "t-records",
    dataHook: "blocks-collection-content-node",
    dataTildaProjectId: "12921081",
    dataTildaPageId: "",
    dataTildaFormskey: "4c4fc82975232ff2402700ee12921081",
    dataTildaCookie: "no",
    dataTildaLazy: "yes",
    dataTildaProjectLang: "RU",
    dataTildaRootZone: "com",
    dataTildaProjectCountry: "RU",
  };

  if (!match) {
    return defaults;
  }

  const attrs: Record<string, string> = {};
  const attrRe = /([\w-]+)="([^"]*)"/g;
  let attrMatch: RegExpExecArray | null;

  while ((attrMatch = attrRe.exec(match[1]))) {
    attrs[attrMatch[1]] = attrMatch[2];
  }

  return {
    className: attrs.class ?? defaults.className,
    dataHook: attrs["data-hook"] ?? defaults.dataHook,
    dataTildaProjectId: attrs["data-tilda-project-id"] ?? defaults.dataTildaProjectId,
    dataTildaPageId: attrs["data-tilda-page-id"] ?? defaults.dataTildaPageId,
    dataTildaFormskey: attrs["data-tilda-formskey"] ?? defaults.dataTildaFormskey,
    dataTildaCookie: attrs["data-tilda-cookie"] ?? defaults.dataTildaCookie,
    dataTildaLazy: attrs["data-tilda-lazy"] ?? defaults.dataTildaLazy,
    dataTildaProjectLang: attrs["data-tilda-project-lang"] ?? defaults.dataTildaProjectLang,
    dataTildaRootZone: attrs["data-tilda-root-zone"] ?? defaults.dataTildaRootZone,
    dataTildaProjectCountry: attrs["data-tilda-project-country"] ?? defaults.dataTildaProjectCountry,
    dataTildaPageAlias: attrs["data-tilda-page-alias"],
  };
}
