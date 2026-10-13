import { entity, googleReview } from '@/data/site';
import type { TopicFaq } from '@/data/topics';

export const SITE_URL = 'https://JiaobanshanPark.com';

/** 全站統一的 TouristAttraction 結構化資料（與首頁 @id 保持一致） */
export function buildAttractionSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['TouristAttraction', 'Park'],
    '@id': `${SITE_URL}/#attraction`,
    name: entity.fullName,
    alternateName: [
      entity.fullNameEn,
      entity.shortName,
      `${entity.stateProvince}${entity.city}${entity.fullName}`,
      `${entity.shortNameEn} ${entity.cityEn}`,
    ],
    description: `位於${entity.country}${entity.stateProvince}${entity.city}的${entity.fullName}（${entity.fullNameEn}），含行館、梅園、戰備隧道與思親亭等景點。`,
    url: `${SITE_URL}/`,
    isAccessibleForFree: true,
    telephone: entity.telephone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: entity.streetAddress,
      addressLocality: entity.city,
      addressRegion: entity.stateProvince,
      postalCode: entity.postalCode,
      addressCountry: entity.countryCode,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: entity.latitude,
      longitude: entity.longitude,
    },
    hasMap: entity.mapsShareUrl,
    sameAs: [entity.mapsShareUrl, entity.govtTourismUrl],
  };
}

export function buildBreadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function buildFaqPageSchema(faqs: TopicFaq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/** 評分快照（僅供 JSON-LD 之外的視覺展示使用，不寫入結構化資料） */
export const ratingSnapshot = {
  rating: googleReview.rating,
  ratingCount: googleReview.ratingCount,
  ratingScale: googleReview.ratingScale,
  syncLabel: googleReview.syncLabel,
};
