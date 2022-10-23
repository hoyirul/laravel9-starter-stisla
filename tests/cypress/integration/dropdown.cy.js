describe("Landing page and login to crud", () => {
    it("Visit to Login Page", () => {
      cy.visit("/");
    });
    
    it("User can Display | Create | Edit | Delete Authors in Master Data in application", () => {
        cy.visit("/login");
        cy.get('[data-id="inputEmail"]').type("superadmin@gmail.com");
        cy.get('[data-id="inputPassword"]').type("password");
        cy.get('[data-id="btnLogin"]').click();
        
        cy.get('[data-id="faBars"]').click();
        cy.get(':nth-child(4) > .has-dropdown').click();
        cy.get('.active > .dropdown-menu > :nth-child(1) > .nav-link').click();

        cy.get('.card-header-action > .btn-icon').click();
        cy.get('#name').type('testing')
        cy.get('#icon').type('testing')
        // cy.get('#select2-permission_name-5j-container').click().get('[data-id="option"]').click()
        cy.get("select")
            .select("Highest to lowest")
            .invoke("val")
            .should("eq", "highestprice");
        // cy.get('select').click('Dashboard');
        // cy.get('[data-id="titleUserManagement"]').should("have.text", "User Management");
        // cy.get('[data-id="userListData"]').should("have.text", "User List");
        
        // cy.get('[data-id="userAdd"]').click();
        // cy.get('[data-id="inputNameUser"]').type("Testing");
        // cy.get('[data-id="inputEmailUser"]').type("test@gmail.com");
        // cy.get('[data-id="inputPasswordUser"]').type("password");
        // cy.get('[data-id="btnAddUser"]').click();

        // cy.get('[data-id="userEdit2"]').click();
        // cy.get('[data-id="inputEditNameUser"]').clear();
        // cy.get('[data-id="inputEditNameUser"]').type("BlackBox Testing Edit");
        // cy.get('[data-id="btnUpdateUser"]').click();

        // cy.get('[data-id="userDelete9"]').click();

        // cy.get('[data-id="dropDownUser"]').click();
        // cy.get('[data-id="btnLogout"]').click();
    });
});