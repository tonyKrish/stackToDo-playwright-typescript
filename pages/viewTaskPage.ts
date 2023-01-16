import { Page, expect } from "@playwright/test";

export default class ViewTaskPage {

    constructor(public page: Page) { }

    async viewTask(taskName: string) {
        return await this.page.locator(".container p").textContent()
    }
}