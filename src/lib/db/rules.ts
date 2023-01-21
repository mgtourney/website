import Information from "./server";

export default async function getRules() {
  const result = await Information.query(`SELECT * FROM rules ORDER BY ID ASC`);
  const rules = result.rows;
  const rulesSet = {
    Rules: rules.map((rule) => {
      return {
        tabHeader: rule.tabHeader,
        tabContent: [
          {
            tabTitle: rule.tabTitle,
            tabRules: JSON.parse(rule.rule),
          },
        ],
      };
    }),
  };
  return rulesSet;
}
