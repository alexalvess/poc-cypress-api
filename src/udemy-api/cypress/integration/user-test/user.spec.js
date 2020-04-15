/// <reference types="Cypress" />

const baseUrl = Cypress.config("baseUrl");
const defaultUser = Cypress.config("defaultUser");

describe("Recover Users", () => {
    before(() => {
        cy.task("user.deleteAll").then(result => {
            if(result) cy.task("user.insert", defaultUser);
        });
    })

    beforeEach(() => {
        cy.request(`${baseUrl}/User`).as("getUser")
    });

    it("Validate header", () => {
        cy.get("@getUser")
            .its("headers")
            .its("content-type")
            .should("include", "application/json");
    });

    it("Validate status", () => {
        cy.get("@getUser")
            .its("status")
            .should("equal", 200);
    });
});

describe("Create New User", () => {
    beforeEach(() => {
        cy.request("POST", `${baseUrl}/User`, defaultUser).as("insertUser")
    });


    it("Validate header", () => {
        cy.get("@insertUser")
            .its("headers")
            .its("content-type")
            .should("include", "application/json");
    });

    it("Validate status", () => {
        cy.get("@insertUser")
            .its("status")
            .should("equal", 200);
    });

    it("Verify properties", () => {
        cy.get("@insertUser").then((response) => {
            expect(response.body).to.have.property("id");
            expect(response.body).property("id").to.be.a("string");
            expect(response.body).to.contain({
                name: defaultUser.name,
                cpf: defaultUser.cpf
            });
        })
    });
});



describe("Delete a User", () => {
    before(() => {
        cy.task("user.deleteAll").then((result) => {
            if(result) {
                cy.task("user.insert").then((result) => {
                    if(result) {
                        cy.task("user.ids").then((result) => {
                            const id = result[0];
                            cy.request("DELETE", `${baseUrl}/User/${id}`).as("deleteUser");
                        });
                    }
                });
            }
        });
    });

    it("Validate status", () => {
        cy.get("@deleteUser")
            .its("status")
            .should("equal", 200);
    });
});