import { Page } from "@playwright/test";

export default class LoginPage {

    constructor(public page : Page) {}

    async login(email:string, password:string) {
        await this.enterEmail(email);
        await this.enterPassword(password);
        await this.clickOnSignInBtn();
    }

    async enterEmail(emailaddress: string) {
        await this.page.locator("#login")
            .fill(emailaddress)
    }

    async enterPassword(password: string) {
        await this.page.locator("#password")
            .fill(password)
    }

    async clickOnSignInBtn() {
        await Promise.all([
            this.page.waitForNavigation(),
            this.page.locator("#submit").click()
        ])
    }

    async checkRememberMe() {
        await this.page.locator("#remember").check()
    }

    async getError() {
        return await this.page.locator(".error").textContent()
    }

    async invalidLoginAlert() {
        return await this.page.locator(".alert-danger")
    }


}