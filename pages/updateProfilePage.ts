import { Page } from "@playwright/test";


export default class UpdateProfilePage {

    constructor(public page: Page) { }

    async updateName(newName: string) {
        await this.inputNewName(newName)
        await this.clickOnUpdateBtn()
    }

    async inputNewName(newName: string) {
        await this.page.locator("#name").clear()
        await this.page.locator("#name").fill(newName)
    }

    async clickOnUpdateBtn() {
        await Promise.all([
            this.page.waitForNavigation(),
            this.page.locator("#submit").click()
        ])
    }

    async profileUpdateAlert() {
        return await this.page.locator(".alert-success")
    }

    async getProfileName() {
        return await this.page.locator("#navbarDropdownPages").nth(1).textContent()
    }
}