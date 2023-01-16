import { Page, expect } from "@playwright/test";

export default class AddTaskPage {

    constructor(public page: Page) { }

    async addATask(randomNumber: number) {
        const taskTextarea = this.page.locator("textarea#task")
        expect(taskTextarea).toBeEditable();
        await taskTextarea.fill("This is a sample task "+randomNumber)
        await this.page.locator("#submit").click()
    }

    async addATaskByName(taskname: string) {
        const taskTextarea = this.page.locator("textarea#task")
        expect(taskTextarea).toBeEditable()
        await taskTextarea.fill(taskname)
        await this.page.locator("#submit").click()
    }
}