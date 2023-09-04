import { ref, computed } from 'vue';

type Language = 'en' | 'zh'; // 假设只支持英语和中文

const globalLanguage = ref<Language>('zh'); // 初始默认语言为中文

function translate(language: Language, key: string): string {
    const translations: Record<Language, Record<string, string>> = {
        en: {
            'app.title': 'My App',
            'pagination.total': 'total',
            'pagination.pagesize': 'pageSize',
            'pagination.goto' : 'goto',
            'pagination.page' : 'page',
            'pagination.pageClassifier' : 'page',
            'pagination.currentPage' : 'currentPage',
            'pagination.prevPages' : 'prevPages',
            'pagination.nextPages' : 'nextPages',
            'pagination.choose' : 'please choose',
            // 更多...
        },
        zh: {
            'app.title': '我的应用',
            'pagination.total': '总共',
            'pagination.pagesize': '条/页',
            'pagination.goto' :  '前往',
            'pagination.page' : '页面',
            'pagination.pageClassifier' : '页',
            'pagination.currentPage' : '当前页码',
            'pagination.prevPages' : '前页',
            'pagination.nextPages' : '后页',
            'pagination.choose' : '请选择',
            // 更多...
        },
        // 更多语言...
    }
  return translations[language][key] || key; // 如果找不到对应翻译，返回原始键
}


export function useLocale() {
  // 当前语言
    const currentLanguage = computed<Language>(() => globalLanguage.value);
  // 翻译函数
    function t(key: string): string {
        return translate(currentLanguage.value, key);
    }
    return { currentLanguage, t };
}
