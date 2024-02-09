import * as shopping_items from "../services/shopping_items.js";
import * as requestUtils from "../utils/requestUtils.js";

const createShoppingItem = async (request) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");
  const formData = await request.formData();
  const name = formData.get("name");
  await shopping_items.createItem(urlParts[2], name);

  return requestUtils.redirectTo(`/lists/${urlParts[2]}`);
};

const finishShoppingItem = async (request) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");
  await shopping_items.deleteItems(urlParts[4]);

  return requestUtils.redirectTo(`/lists/${urlParts[2]}`);
};

export { createShoppingItem, finishShoppingItem };