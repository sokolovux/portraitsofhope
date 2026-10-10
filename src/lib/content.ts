import { getCollection } from "astro:content";

const byOrder = <T extends { data: { order: number } }>(a: T, b: T) => a.data.order - b.data.order;

export async function getPortraits() {
  const portraits = await getCollection("portraits", ({ data }) => !data.draft);
  return portraits.sort(byOrder);
}

export async function getCampaigns() {
  const campaigns = await getCollection("campaigns", ({ data }) => !data.draft);
  return campaigns.sort(byOrder);
}

export async function getFeaturedCampaigns() {
  return (await getCampaigns()).filter(({ data }) => data.featured);
}
