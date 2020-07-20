// npm install --save-dev chromedriver
// npm install --save-dev selenium-webdriver
// node LinkedIn.js cred.json post.txt



let fs = require('fs');
let cd = require('chromedriver');
let sd = require('selenium-webdriver');
let driver = new sd.Builder().forBrowser('chrome').build();
let path = require('path');

let cfile = process.argv[2];
let postfile = process.argv[3];


async function fun()
{
    try{
       
        let content=await fs.promises.readFile(cfile , 'utf-8');
        let obj=JSON.parse(content);
        let username=obj.user;
        let pas=obj.pwd;

        
        let content1=await fs.promises.readFile(postfile);
        

        await driver.get("https://www.linkedin.com/login?fromSignIn=true&trk=guest_homepage-basic_nav-header-signin");
        driver.manage().window().maximize();
        let emailBox= await driver.findElement(sd.By.css("#username"));
        let psdBox= (await driver).findElement(sd.By.css("#password"));
        
       

        await emailBox.sendKeys(username);
        await psdBox.sendKeys(pas);
       (await (await driver).findElement(sd.By.css("[type=submit]"))).click();

        
        //  await driver.manage().setTimeouts({
        //     implicit: 30000,
        //     pageLoad: 30000
        // });
     
      

        await driver.wait(sd.until.elementLocated(sd.By.css('button.share-box__open.share-box__trigger.p4.hoverable-link-text.t-16.t-black--light.t-bold.share-box__trigger-no-border')));
        let postbtn= (await driver).findElement(sd.By.css('button.share-box__open.share-box__trigger.p4.hoverable-link-text.t-16.t-black--light.t-bold.share-box__trigger-no-border'));

        
         (await postbtn).click();
        
        await driver.wait(sd.until.elementLocated(sd.By.css('div.ql-editor.ql-blank')))
        let post= await driver.findElement(sd.By.css('div.ql-editor.ql-blank'));

      
       
        await post.sendKeys(content1 + "");
         await driver.sleep(3000);
       
        // await driver.wait(sd.until.elementLocated(sd.By.css("span.artdeco-button__text")));
        let postbtttn= await driver.findElement(sd.By.xpath("/html/body/div[4]/div/div/div[2]/div/div[2]/div[2]/button"));
        await postbtttn.click();
        console.log("Completed Successfully");
      
        
    }
    catch(err){
        console.log(err);
    }
}

fun();
console.log("Done!!!");
