import { Page } from "@playwright/test";

export default class TasksPage {

    constructor(public page: Page) { }

    async goToSignUp() {
        await this.page.locator("'Sign Up'").click()
    }

    async goToLogin() {
        await this.page.locator("'Login'").click()
    }

    async goToCalendar() {
        await this.page.locator("'Calendar'").click()
    }

    async logoutAlert() {
        return await this.page.locator(".alert-success")
    }

}