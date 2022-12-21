import SpanishTranslation from './es';
import EnglishTranslation from './en';

const AllTranslations = {
  ES: SpanishTranslation,
  EN: EnglishTranslation,
};

export type Languages = keyof typeof AllTranslations;

export default AllTranslations;
