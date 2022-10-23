describe("Landing page and login to crud", () => {
    it("Visit to Login Page", () => {
      cy.visit("/");
    });
  
    it("Login Page", () => {
        cy.visit("/login");
        cy.get('[data-id="title"]').should("have.text", "Login");
        cy.get('[data-id="lblEmail"]').should("have.text", "Email");
        cy.get('[data-id="lblPassword"]').should("have.text", "Password");
        cy.get('[data-id="btnLogin"]').contains("Login").and("be.enabled");
    });
  
    it("Login required", () => {
      cy.visit("/login");
      cy.get('[data-id="title"]').should("have.text", "Login");
      cy.get('[data-id="lblEmail"]').should("have.text", "Email");
      cy.get('[data-id="lblPassword').should("have.text", "Password");
      cy.get('[data-id="btnLogin"]').contains("Login").and("be.enabled");
  
      cy.get(".btn").click();
      cy.get(".invalid-feedback").contains("The email field is required.");
      cy.get(".invalid-feedback").contains("The password field is required.");
    });
  
    it("User Cannot Login to dashboard", () => {
      cy.visit("/login");
      cy.get('[data-id="title"]').should("have.text", "Login");
      cy.get('[data-id="lblEmail"]').should("have.text", "Email");
      cy.get('[data-id="lblPassword').should("have.text", "Password");
      cy.get('[data-id="btnLogin"]').contains("Login").and("be.enabled");
  
      cy.get('[data-id="inputEmail"]').type("example@gmail.com");
      cy.get('[data-id="inputPassword"]').type("password");
      cy.get('[data-id="btnLogin"]').click();
      cy.get(".invalid-feedback").contains(
          "These credentials do not match our records."
      );
    });
  
    it("User can login to application", () => {
        cy.visit("/login");
        cy.get('[data-id="title"]').should("have.text", "Login");
        cy.get('[data-id="lblEmail"]').should("have.text", "Email");
        cy.get('[data-id="lblPassword').should("have.text", "Password");
        cy.get('[data-id="btnLogin"]').contains("Login").and("be.enabled");
  
        cy.get('[data-id="inputEmail"]').type("superadmin@gmail.com");
        cy.get('[data-id="inputPassword"]').type("password");
        cy.get('[data-id="btnLogin"]').click();
  
        cy.get('[data-id="dropDownUser"]').click();
        cy.get('[data-id="btnLogout"]').click();
    });
    
    it("User can Display | Create | Edit | Delete Authors in Master Data in application", () => {
        cy.visit("/login");
        cy.get('[data-id="inputEmail"]').type("superadmin@gmail.com");
        cy.get('[data-id="inputPassword"]').type("password");
        cy.get('[data-id="btnLogin"]').click();
        
        cy.get('[data-id="faBars"]').click();
        cy.get(':nth-child(2) > .has-dropdown').click();
        cy.get('.active > .dropdown-menu > li > .nav-link').click();

        cy.get('[data-id="titleUserManagement"]').should("have.text", "User Management");
        cy.get('[data-id="userListData"]').should("have.text", "User List");
        
        cy.get('[data-id="userAdd"]').click();
        cy.get('[data-id="inputNameUser"]').type("Testing");
        cy.get('[data-id="inputEmailUser"]').type("test@gmail.com");
        cy.get('[data-id="inputPasswordUser"]').type("password");
        cy.get('[data-id="btnAddUser"]').click();

        // cy.get('[data-id="userEdit2"]').click();
        // cy.get('[data-id="inputEditNameUser"]').clear();
        // cy.get('[data-id="inputEditNameUser"]').type("BlackBox Testing Edit");
        // cy.get('[data-id="btnUpdateUser"]').click();

        // cy.get('[data-id="userDelete9"]').click();

        cy.get('[data-id="dropDownUser"]').click();
        cy.get('[data-id="btnLogout"]').click();
    });
  });