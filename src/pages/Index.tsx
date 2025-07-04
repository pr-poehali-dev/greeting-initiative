import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

const Index = () => {
  const [inputText, setInputText] = useState("");
  const [sortedProducts, setSortedProducts] = useState<{
    [key: string]: string[];
  }>({});

  const productCategories = {
    "Молочные продукты": [
      "молоко",
      "сливки",
      "сметана",
      "кефир",
      "творог",
      "йогурт",
      "масло",
      "сыр",
      "ряженка",
      "простокваша",
    ],
    "Хлебобулочные изделия": [
      "хлеб",
      "батон",
      "булочка",
      "багет",
      "лаваш",
      "круассан",
      "пирожок",
      "пончик",
      "сдоба",
    ],
    Овощи: [
      "картофель",
      "морковь",
      "лук",
      "капуста",
      "помидор",
      "огурец",
      "свекла",
      "перец",
      "баклажан",
      "кабачок",
    ],
    Фрукты: [
      "яблоко",
      "банан",
      "апельсин",
      "груша",
      "виноград",
      "мандарин",
      "лимон",
      "киви",
      "персик",
      "слива",
    ],
    "Мясо и птица": [
      "курица",
      "говядина",
      "свинина",
      "баранина",
      "индейка",
      "утка",
      "колбаса",
      "сосиски",
      "фарш",
    ],
    "Рыба и морепродукты": [
      "лосось",
      "тунец",
      "селедка",
      "креветки",
      "мидии",
      "кальмар",
      "краб",
      "треска",
      "форель",
    ],
    "Крупы и макароны": [
      "рис",
      "гречка",
      "овсянка",
      "перловка",
      "макароны",
      "спагетти",
      "лапша",
      "пшено",
      "манка",
    ],
    Напитки: [
      "вода",
      "сок",
      "чай",
      "кофе",
      "газировка",
      "молоко",
      "квас",
      "пиво",
      "вино",
    ],
    Сладости: [
      "конфеты",
      "шоколад",
      "печенье",
      "торт",
      "пирожное",
      "мороженое",
      "варенье",
      "мед",
      "зефир",
    ],
    Консервы: [
      "тушенка",
      "рыбные консервы",
      "компот",
      "огурцы",
      "помидоры",
      "грибы",
      "кукуруза",
      "горошек",
    ],
  };

  const categorizeProducts = (products: string[]) => {
    const result: { [key: string]: string[] } = {};
    const uncategorized: string[] = [];

    products.forEach((product) => {
      const cleanProduct = product.trim().toLowerCase();
      if (!cleanProduct) return;

      let categorized = false;

      for (const [category, keywords] of Object.entries(productCategories)) {
        if (
          keywords.some(
            (keyword) =>
              cleanProduct.includes(keyword) || keyword.includes(cleanProduct),
          )
        ) {
          if (!result[category]) {
            result[category] = [];
          }
          result[category].push(product.trim());
          categorized = true;
          break;
        }
      }

      if (!categorized) {
        uncategorized.push(product.trim());
      }
    });

    if (uncategorized.length > 0) {
      result["Прочее"] = uncategorized;
    }

    return result;
  };

  const handleSort = () => {
    const products = inputText
      .split(/[,\n]/)
      .filter((item) => item.trim() !== "");
    const categorized = categorizeProducts(products);
    setSortedProducts(categorized);
  };

  const handleClear = () => {
    setInputText("");
    setSortedProducts({});
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Сортировщик продуктов
          </h1>
          <p className="text-gray-600">
            Введите список продуктов для группировки по категориям
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Edit" size={20} />
                Список продуктов
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Введите продукты через запятую или с новой строки&#10;Например: молоко, хлеб, яблоки, сметана"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="min-h-[200px] resize-none"
              />
              <div className="flex gap-2">
                <Button
                  onClick={handleSort}
                  disabled={!inputText.trim()}
                  className="flex-1"
                >
                  <Icon name="ArrowUpDown" size={16} className="mr-2" />
                  Сортировать
                </Button>
                <Button variant="outline" onClick={handleClear}>
                  <Icon name="X" size={16} className="mr-2" />
                  Очистить
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Output Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="List" size={20} />
                Отсортированные категории
              </CardTitle>
            </CardHeader>
            <CardContent>
              {Object.keys(sortedProducts).length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Icon
                    name="Package"
                    size={48}
                    className="mx-auto mb-4 opacity-50"
                  />
                  <p>Результат сортировки появится здесь</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {Object.entries(sortedProducts).map(
                    ([category, products]) => (
                      <div key={category} className="border rounded-lg p-4">
                        <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                          <Icon name="Tag" size={16} />
                          {category}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {products.map((product, index) => (
                            <span
                              key={index}
                              className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-sm"
                            >
                              {product}
                            </span>
                          ))}
                        </div>
                      </div>
                    ),
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
