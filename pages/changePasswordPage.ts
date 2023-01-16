import { Page } from "@playwright/test";


export default class ChangePasswordPage {

    constructor(public page: Page) { }

    async changePassword(password: string, newPassword:string) {
        await this.enterCurrentPassword(password)
        await this.enterNewPassword(newPassword)
        await this.enterPasswordAgain(newPassword)
        await this.clickOnUpdateBtn()
    }

    async enterCurrentPassword(password: string) {
        await this.page.locator("#password")
            .fill(password)
    }

    async enterNewPassword(newPassword: string) {
        await this.page.locator("#new_password")
            .fill(newPassword)
    }

    async enterPasswordAgain(newPassword: string) {
        await this.page.locator("#password_again")
            .fill(newPassword)
    }

    async clickOnUpdateBtn() {
        await Promise.all([
            this.page.waitForNavigation(),
            this.page.locator("#submit").click()
        ])
    }

    async passwordUpdateAlert() {
        return await this.page.locator(".alert-success")
    }

    async logout(username: string) {
        await Promise.all([
            await this.page.locator("//a[text()='"+username+"']").click(),
            await this.page.locator("//a[text()='Logout']").click()
        ])
    }

}