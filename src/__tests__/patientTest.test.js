import { Builder, By, until } from 'selenium-webdriver';
import pkg from '@jest/globals';
const { describe, test, expect, beforeAll, afterAll, jest } = pkg;

jest.setTimeout(30000);

// describe('ClinicCreation E2E Tests', () => {
//   let driver;

//   beforeAll(async () => {
//     // Configurar el driver para Chrome
//     driver = await new Builder().forBrowser('chrome').build();
//   });

//   afterAll(async () => {
//     // Cerrar el navegador después de las pruebas
//     if (driver) {
//       await driver.quit();
//     }
//   });
//   test('Debería registrar una clínica correctamente después de hacer login', async () => {
//     // Paso 1: Ir a la página de login
//     await driver.get('http://localhost:5173/login'); // Cambia la URL según tu ruta de login

//     // Paso 2: Completar el formulario de login
//     await driver.wait(until.elementLocated(By.id(':r1:-form-item')), 10000); // Espera a que el campo email esté presente
//     await driver.findElement(By.id(':r1:-form-item')).sendKeys('adminstaff@cloudmedix.com'); // Rellena el email

//     await driver.findElement(By.id(':r3:-form-item')).sendKeys('Adminstaff.123'); // Rellena el password

//     // Paso 3: Enviar el formulario de login
//     await driver.findElement(By.css('button[type="submit"]')).click();

//     // Paso 4: Esperar que el usuario sea redirigido o que aparezca un elemento del dashboard
//     await driver.wait(until.urlIs('http://localhost:5173/app'), 10000); // Cambia la URL de destino

//     // Paso 5: Ir a la página de creación de clínicas
//     await driver.get('http://localhost:5173/app/clinics/add'); // Cambia según tu ruta

//     // Paso 6: Completar el formulario de creación de clínicas
//     await driver.wait(until.elementLocated(By.id('name')), 10000); // Esperar que el formulario esté listo
//     await driver.findElement(By.id('name')).sendKeys('Clínica Ejemplo');
//     await driver.findElement(By.id('city')).sendKeys('Sevilla');
//     await driver.findElement(By.id('district')).sendKeys('Triana');
//     await driver.findElement(By.id('postalCode')).sendKeys('41010');

//     // Paso 2: Esperar que los botones "Elegir Plan" estén visibles
//     await driver.wait(until.elementsLocated(By.css('button[type="button"]')), 10000);

//     // Paso 3: Seleccionar el botón del plan "Advanced" (ajusta el texto si es diferente)
//     const advancedPlanButton = await driver.findElement(By.xpath("//button[contains(text(),'Elegir Plan') and ancestor::div[contains(., 'Advanced')]]"));
//     await advancedPlanButton.click();


//     // Paso 8: Enviar el formulario
//     const submitButton = await driver.findElement(By.css('button[type="submit"]'));
//     await submitButton.click();

//     // Paso 9: Verificar la redirección
//     await driver.wait(until.urlContains('stripe'), 10000);

//     const currentUrl = await driver.getCurrentUrl();
//     expect(currentUrl).toContain('stripe');
//   });
// });

describe('ClinicCreation E2E Tests', () => {
  let driver;
 
  beforeAll(async () => {
    // Configurar el driver para Chrome
    driver = await new Builder().forBrowser('chrome').build();
  });
 
  afterAll(async () => {
    // Cerrar el navegador después de las pruebas
    if (driver) {
      await driver.quit();
    }
  });
  test('Debería registrar un paciente correctamente después de hacer login', async () => {
    // Paso 1: Ir a la página de login
    await driver.get('http://localhost:5173/login'); // Cambia la URL según tu ruta de login
 
    // Paso 2: Completar el formulario de login
    await driver.wait(until.elementLocated(By.id(':r1:-form-item')), 10000); // Espera a que el campo email esté presente
    await driver.findElement(By.id(':r1:-form-item')).sendKeys('patient@cloudmedix.com'); // Rellena el email
 
    await driver.findElement(By.id(':r3:-form-item')).sendKeys('Patient.123'); // Rellena el password
 
    // Paso 3: Enviar el formulario de login
    await driver.findElement(By.css('button[type="submit"]')).click();
 
    // Paso 4: Esperar que el usuario sea redirigido o que aparezca un elemento del dashboard
    await driver.wait(until.urlIs('http://localhost:5173/app'), 10000); // Cambia la URL de destino
 
    await driver.get('http://localhost:5173/app/patients/edit');

    // Esperar que el formulario de edición cargue
    await driver.wait(until.elementLocated(By.xpath("//button[text()='Editar']")), 10000);
    await driver.findElement(By.xpath("//button[text()='Editar']")).click();
  
    // Esperar el formulario editable
    await driver.wait(until.elementLocated(By.xpath("//label[text()='Nombre']/following-sibling::input")), 10000);
  
    // Completar el formulario de edición
    await driver.findElement(By.xpath("//label[text()='Nombre']/following-sibling::input")).sendKeys('John');
    await driver.findElement(By.xpath("//label[text()='Apellido']/following-sibling::input")).sendKeys('Doe');
    await driver.findElement(By.xpath("//label[text()='DNI']/following-sibling::input")).sendKeys('');
    await driver.findElement(By.xpath("//label[text()='Ciudad']/following-sibling::input")).sendKeys('Sevilla');
    await driver.findElement(By.xpath("//label[text()='Fecha de Nacimiento']/following-sibling::input")).sendKeys('01-01-1998');
  
    // Guardar los cambios
    const saveButton = await driver.findElement(By.xpath("//button[text()='Guardar']"));
    await saveButton.click();
  
    // Verificar que el botón "Editar" sigue visible (indicación de que regresó al estado inicial)
    const editButton = await driver.wait(until.elementLocated(By.xpath("//button[text()='Editar']")), 10000);
    expect(editButton).toBeTruthy();
    
  });
});
 