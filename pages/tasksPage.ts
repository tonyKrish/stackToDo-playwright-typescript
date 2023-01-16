import { Page } from "@playwright/test";

export default class TasksPage {

    constructor(public page: Page) { }

    async goToAddTask() {
        await Promise.all([
            await this.page.locator("//a[text()='Tasks']").click(),
            await this.page.locator("//a[text()='Add Task']").click()
        ])
    }

    async goToMyTask() {
        await Promise.all([
            await this.page.locator("//a[text()='Tasks']").click(),
            await this.page.locator("//a[text()='My Tasks']").click()
        ])
    }

    async logout(username: string) {
        await Promise.all([
            await this.page.locator("//a[text()='"+username+"']").click(),
            await this.page.locator("//a[text()='Logout']").click()
        ])
    }

    async goToChangePassword(username: string) {
        await Promise.all([
            await this.page.locator("//a[text()='"+username+"']").click(),
            await this.page.locator("//a[text()='Change Password']").click()
        ])
    }

    async goToUpdateProfile(username: string) {
        await Promise.all([
            await this.page.locator("//a[text()='"+username+"']").click(),
            await this.page.locator("//a[text()='Update Profile']").click()
        ])
    }

    async getProfileName() {
        return await this.page.locator("#navbarDropdownPages").nth(1).textContent()
    }

    async getTaskCount() {
        return await this.page.locator(".table tbody tr .btn-group").count()
    }

    async deleteLastTask(taskCount: number) {
        await this.page.locator("//a[text()='Delete']").nth(taskCount-1).click()
    }

    async deleteTaskByName(name: string) {
        await this.page.locator("//td[text()='"+name+"']/following-sibling::td//a[text()='Delete']").click()
    }

    async editTaskByName(name: string) {
        await this.page.locator("//td[text()='"+name+"']/following-sibling::td//a[text()='Edit']").click()
    }

    async viewTaskByName(name: string) {
        await this.page.locator("//td[text()='"+name+"']/following-sibling::td//a[text()='View']").click()
    }

}