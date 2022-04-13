// Book Class: Represents a Book
class Site {
    constructor(site_title, site_link, isbn) {
      this.site_title = site_title;
      this.site_link = site_link;
      this.isbn = isbn;
    }
  }
  
  class UI {
    static displaySites() {
      const sites = Store.getSites();
  
      sites.forEach((site) => UI.addSiteToList(site));
    }
  
    static addSiteToList(site) {
      const list = document.querySelector('#site-list');
  
      const row = document.createElement('tr');

      const result=site.site_link;
      console.log(result);

  
      row.innerHTML = `
        <td class="text-center colorText2">${site.site_title}</td>
        <td class="text-center colorText2"><a href=${result}>${result}</a></td>
        <td class="text-center colorText2">${site.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
      `;
  
      list.appendChild(row);
    }
  
    static deleteSite(el) {
      if(el.classList.contains('delete')) {
        el.parentElement.parentElement.remove();
      }
    }
  
    static showAlert(message, className) {
      const div = document.createElement('div');
      div.className = `alert alert-${className}`;
      div.appendChild(document.createTextNode(message));
      const container = document.querySelector('.container');
      const form = document.querySelector('#site-form');
      container.insertBefore(div, form);
  
      // Vanish in 2 seconds
      setTimeout(() => document.querySelector('.alert').remove(), 2000);
    }
  
    static clearFields() {
      document.querySelector('#site_title').value = '';
      document.querySelector('#site_link').value = '';
      document.querySelector('#isbn').value = '';
    }
  }
  
  // Store Class: Handles Storage
  class Store {
    static getSites() {
      let sites;
      if(localStorage.getItem('sites') === null) {
        sites = [];
      } else {
          //using json here because it is a string to convert it into java script file
        sites = JSON.parse(localStorage.getItem('sites'));
      }
  
      return sites;
    }
  
    static addSite(site) {
      const sites = Store.getSites();
      sites.push(site);
      localStorage.setItem('sites', JSON.stringify(sites));
    }
  
    static removeSite(isbn) {
      const sites = Store.getSites();
  
      sites.forEach((site, index) => {
        if(site.isbn === isbn) {
          sites.splice(index, 1);
          //index which need to be removed
        }
      });
  
      localStorage.setItem('sites', JSON.stringify(sites));
    }
  }
  
  // Event: Display Books
  document.addEventListener('DOMContentLoaded', UI.displaySites);
  
  // Event: Add a Book
  document.querySelector('#site-form').addEventListener('submit', (e) => {
    // Prevent actual submit
    e.preventDefault();
  
    // Get form values
    const site_title = document.querySelector('#site_title').value;
    const site_link = document.querySelector('#site_link').value;
    const isbn = document.querySelector('#isbn').value;
  
    // Validate
    if(site_title === '' || site_link === '' || isbn === '') {
      UI.showAlert('Please fill in all fields', 'danger');
    } else {
      // Instatiate site
      const site = new Site(site_title, site_link, isbn);
  
      // Add Site to UI
      UI.addSiteToList(site);
  
      // Add book to store
      Store.addSite(site);
  
      // Show success message
      UI.showAlert('Site Added', 'success');
  
      // Clear fields
      UI.clearFields();
    }
  });
  
  // Event: Remove a Site
  document.querySelector('#site-list').addEventListener('click', (e) => {
    // Remove Site from UI
    UI.deleteSite(e.target);
  
    // Remove site from store
    Store.removeSite(e.target.parentElement.previousElementSibling.textContent);

  });