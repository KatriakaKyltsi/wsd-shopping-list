import { renderFile } from "https://deno.land/x/eta@v2.2.0/mod.ts";
import * as listService from "../services/listService.js";
import * as shopping_items from "../services/shopping_items.js";
import * as requestUtils from "../utils/requestUtils.js";

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const countTheListsandItems = async () => {
  const data = {
    list_count: await listService.CountLists(),
    item_count: await shopping_items.CountItems(),
  };
  return new Response(await renderFile("mainpage.eta", data), responseDetails);
};

const addList = async (request) => {
  const formData = await request.formData();
  const name = formData.get("name");

  await listService.create(name);

  return requestUtils.redirectTo("/lists");
};

const viewList = async (request) => {

  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");
  const data = {
    list: await listService.findById(urlParts[2]),
    items: await shopping_items.findItems(urlParts[2]),
      };
  return new Response(await renderFile("list.eta", data), responseDetails);
};

const viewLists = async () => {
  const data = {
    shopping_lists: await listService.findAllNonCompletedLists(),
  };
  return new Response(await renderFile("lists.eta", data), responseDetails);
};

const deleteList = async (request) => {
  const url = new URL(request.url);
  const parts = url.pathname.split("/");
  const id = parts[2]
  await listService.completeById(id);
  return requestUtils.redirectTo("/");
};

export { addList, viewList, viewLists, deleteList, countTheListsandItems };
