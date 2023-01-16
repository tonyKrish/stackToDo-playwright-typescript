import { Page, expect } from "@playwright/test";

export default class EditTaskPage {

    constructor(public page: Page) { }

    async editTask(newTaskName: string) {
        const taskTextarea = this.page.locator("textarea#task")
        expect(taskTextarea).toBeEditable()
        await taskTextarea.fill(newTaskName)
        await this.page.locator("#submit").click()
    }
}