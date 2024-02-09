import { serve } from "./deps.js";
import { configure } from "https://deno.land/x/eta@v2.2.0/mod.ts";
import * as listController from "./controller/listController.js";
import * as shoppingItemController from "./controller/shoppingItemController.js";


configure({
    views: `${Deno.cwd()}/views/`,
  });
  

const handleRequest = async (request) => {
    const url = new URL(request.url);
    if (url.pathname === "/" && request.method === "GET") {
        return await listController.countTheListsandItems();

    } else if (url.pathname === "/lists" && request.method === "POST") {
        return await listController.addList(request);
    } else if (url.pathname.match("lists/[0-9]+/items/[0-9]+/collect") && request.method === "POST") {
        return await shoppingItemController.finishShoppingItem(request);
    }else if (url.pathname === "/lists" && request.method === "GET") {
        return await listController.viewLists(request);
    } else if (url.pathname.match("lists/[0-9]+") && request.method === "GET") {
        return await listController.viewList(request);
    } else if (url.pathname.match("lists/[0-9]+/items") && request.method === "POST") {
        return await shoppingItemController.createShoppingItem(request);
    } else if (url.pathname.match("lists/[0-9]+") && request.method === "POST") {
        return await listController.deleteList(request);
      }
    else {
        return new Response("Not found",  {status: 404});
}
};


serve(handleRequest, { port: 7777 });
