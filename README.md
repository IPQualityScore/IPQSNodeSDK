# NPM IPQS API Integration

This NPM package provides a straightforward interface for NodeJS developers to integrate with the IPQualityScore API - an advanced solution for identifying fraudulent and malicious online activity. As cybercrime and online fraud continue to increase, having a reliable and effective tool to combat these threats is essential. Our npm package streamlines the integration process and offers a simple way for developers to leverage the powerful capabilities of the IPQualityScore API in their web-based applications. Whether you're developing an e-commerce site, a banking app, or any other web-based platform, our npm package can help you identify and prevent fraudulent activity before it can cause harm. By implementing just a few lines of code, you can start utilizing the IPQualityScore API and take proactive measures to safeguard your business and users.

https://www.ipqualityscore.com/documentation/overview

![Badge TypeScript](./artifacts/typescript.bmp) ![Badge NodeJS](./artifacts/nodejs.bmp)

![Badge Statements](./artifacts/badge-statements.svg) ![Badge Lines](./artifacts/badge-lines.svg) ![Badge Functions](./artifacts/badge-functions.svg) ![Badge Branches](./artifacts/badge-branches.svg)

# Table of Contents

1. [Getting Started](#getting-started)
2. [About Your Private Key](#about-your-private-key)
3. [Changing Your Export Type](#changing-your-export-type)
4. [Your Request/Update Parameters](#your-requestupdate-parameters)
5. [Removing the Private Key from the URL](#removing-the-private-key-from-the-url)
6. [Get or Post?](#get-or-post)
7. [Handling Failed Responses](#failed-responses)
8. [Available Methods](#available-methods)
    * Setup:
      * [Config Options, Parameters, and Methods](#config-options-parameters-and-methods-)
    * Methods: 
      * [Proxy Detection](#proxy-detection)
      * [Averages](#averages)
      * [Postback](#postback)
      * [Fraud Report](#fraud-report)
      * [Credit Usage](#credit-usage)
      * [Email Validation](#email-validation)
      * [Leaked Report](#leaked-report)
      * [Phone Validation](#phone-validation)
      * [URL Validation](#url-validation)
      * [Request List](#request-list)

## Getting started

To use the `getProxyDetectionResult` function, you need to import it into your application:

```javascript
import IPQS_API from 'ipqs-node-sdk';
```

Then, you can call the function and await the returned Promise to get the result:

```javascript
const privateKey = 'yourPrivateKey';
const params = {
    config: {
        exportType: 'json'
    },
    requestParameters: {
        ip: '8.8.8.8',
        user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/111.0',
        language: 'en;q=0.8',
        strictness: 1,
        lighter_penalties: false
    }
};
IPQS_API.proxyDetection(privateKey, params).get().then((res) => {
    console.log("Your result", res);
});
```

You can also use async/await within an async function by calling:

```javascript
const result = await IPQS_API.proxyDetection(privateKey, params).get();
```


## About Your Private Key

Storing private keys in a public repository can lead to a potential security breach since anyone with access to the repository can access the private key. This can be especially dangerous if the private key is used for encryption or digital signatures, as the confidentiality and authenticity of the data may be compromised. Therefore, it is essential to keep private keys confidential and secure.

One of the best ways to include a private key in a Node.js application is to use environment variables. Environment variables are stored outside of the codebase, making them much harder to access than hardcoded values within the code. You can set environment variables in your development environment or server and access them within your code using the process.env object.

For example, let's say you have a private key stored in a PRIVATE_KEY environment variable. You can access it in your code like this:

```javascript
const privateKey = process.env.PRIVATE_KEY;
```

## Changing Your Export Type

Two types of export are available. XML uses tags and attributes to define elements, while JSON uses key-value pairs to represent data. JSON is simpler and more lightweight than XML, and is commonly used for data exchange between web applications and APIs.

This is only available with endpoints that have different export types.

```javascript
const params = {
    config: {
        exportType: 'json' | 'xml'
    }
};
```

When exporting `json`, the output will look similar to this as explained [here](https://www.ipqualityscore.com/documentation/proxy-detection/overview):

```json
{
  "message": "Success.",
  "success": true,
  "proxy": false,
  "ISP": "Mediacom Cable",
  "organization": "Mediacom Cable",
  "ASN": 30036,
  "host": "171-33-111-143.client.mchsi.com",
  "country_code": "US",
  "city": "Houston",
  "region": "Texas",
  "is_crawler": false,
  "connection_type": "Residential",
  "latitude": 29.7079,
  "longitude": -95.401,
  "zip_code": "77001",
  "timezone": "America Matamoros"
}
```

In Node.js, there is no native built-in "XML object" like there is for JSON objects. While Node.js provides native support for working with JSON data using the JSON object, it does not have a corresponding native XML object. This means that working with XML in Node.js requires the use of external modules or libraries that provide XML parsing and serialization functionality. Some popular XML parsing libraries for Node.js include xml2js, libxmljs, and sax-js.

As a result, the return object will have a success flag with a value of `true` and an `xml` value which is a string representation of the XML:

```json
{
    "success": true,
    "xml": "<?xml version=\"1.0\" encoding=\"UTF-8\"?><result><proxy>false</proxy>..."
}
```

## Your Request/Update Parameters

To enhance the accuracy of proxy detection, IPQualityScore provides additional info and scoring settings that can be passed through their API. By passing additional data such as ip addresses, user-agent strings, and geolocation information, users can obtain more accurate results in their proxy detection analysis. Furthermore, scoring settings enable users to customize the scoring thresholds for the detection of different types of proxies. By adjusting the scoring thresholds, users can fine-tune the sensitivity of their detection and reduce false positives. By taking advantage of these features, users can improve the accuracy of their proxy detection and enhance the security of their web-based applications.

To ensure the most accurate usage of our API, and to determine what parameters can be used with each endpoint, we have provided comprehensive documentation specifying the parameters that are allowed for each endpoint. Please feel free to refer to our API documentation for further details on the parameters that can be used as this NPM package is only an interface to the main API.

https://www.ipqualityscore.com/documentation/proxy-detection/best-practices

You will be able to pass in specific request or update parameters in the initial params object:

```javascript
const params = {
    config,
    requestParameters,
    updateParameters,
};
```

Each set of parameters available will vary based on each endpoint and are listed in the official documentation for IPQS.

Some endpoints require these additional parameters, and some do not. 

## Removing the Private Key from the URL

By default, IPQS does pass the private key in the URL. There are some API endpoints which allow the masking of the private key by either passing it as a get or post parameter OR by passing in a specific request header. If either of these config flags are set to true, then the primary key will no longer be in the URL endpoint.

You can use either flag, or both.

```javascript
const params = {
    config: {
        exportType: 'json',
        pkAsGetOrPostParam: true,
        pkAsHeader: true,
    }
};
```

* `pkAsGetOrPostParam` will automatically pass your private key as a get or post parameter based on the method used.
* `pkAsHeader` will pass your private key as a header in the request

## Get or Post?

Some API endpoints will allow you to use either `GET` or `POST` if those methods are available. Each method is called either `get()` or `post()` and is fairly straightforward.

Here's an example of one endpoint that uses both methods:

```javascript
const result = await IPQS_API.proxyDetection(privateKey, params).get();
const result = await IPQS_API.proxyDetection(privateKey, params).post();
```

## Failed Responses

You may encounter responses that are not successful or incorrect parameters could yield specific errors.

Handling errors and non-200 status codes is handled internally with our package. The streamlined solution for dealing with errors that may arise when using `fetch()` internally ensures that your application has less of a chance of failing when including this package. The API call is wrapped with a Promise wrapper and so non-200 http status codes and internal errors return with the following response:

```json
{
    "success": false, 
    "errorMessage": "Some Error Message" 
}
```

In short, even if we have a rejected Promise or an error with `fetch()` internally, we will always resolve the promise and give some sort of meaningful response.

# Available Methods

Here is a list of all available methods, what config flags are available, and an example of how to make a request. A link to the IPQS documentation is also provided for further details.

### Config Options Parameters and Methods:

With except to the [Averages API](#averages), all param objects will look similar to this, but may not include all of the fields in this example. 

```json
{
     "config": {
         "exportType": "json",
         "pkAsGetOrPostParam": true,
         "pkAsHeader": true
     },
     "requestParameters": {},
     "updateParameters": {}
 }
```

Please see the following table for a quick reference which config/request/update parameters are allowed with each API method, and which methods are available. 

| API                                   | exportType      | pkAsGetOrPostParam | pkAsHeader | requestParameters | updateParameters | .get() | .post() |
|---------------------------------------|-----------------|--------------------|------------|-------------------|------------------|--------|---------|
| [ProxyDetection](#proxy-detection)    | 'json' or 'xml' | optional           | optional   | yes               | no               | yes    | yes     |
| [Averages](#averages)                 | n/a             | n/a                | n/a        | n/a               | n/a              | yes    | no      |
| [Postback](#postback)                 | 'json' or 'xml' | no                 | no         | yes               | yes              | yes    | no      |
| [Fraud Report](#fraud-report)         | 'json' or 'xml' | no                 | no         | yes               | no               | yes    | no      |
| [Credit Usage](#credit-usage)         | 'json' or 'xml' | no                 | no         | yes               | no               | yes    | no      |
| [Email Validation](#email-validation) | 'json' or 'xml' | optional           | optional   | yes               | no               | yes    | yes     |
| [Leaked Report](#leaked-report)       | 'json' or 'xml' | no                 | no         | yes               | no               | yes    | no      |
| [Phone Validation](#phone-validation) | 'json' or 'xml' | optional           | optional   | yes               | no               | yes    | yes     |
| [URL Validation](#url-validation)     | 'json' or 'xml' | optional           | optional   | yes               | no               | yes    | yes     |
| [Request List](#request-list)         | 'json' or 'xml' | optional           | optional   | yes               | yes              | yes    | yes     |

For details about what parameters are available within each parameter, please consult the IPQS documentation links given for each API endpoint.

## Proxy Detection

Methods Available:
```javascript
IPQS_API.proxyDetection(privateKey, params).get()
IPQS_API.proxyDetection(privateKey, params).post()
```

Example:
```javascript
    import IPQS_API from 'ipqs-node-sdk';
    
    const privateKey = 'yourPrivateKey'
    const params = {
        config: {
            exportType: 'json',
            pkAsGetOrPostParam: true,
            pkAsHeader: true
        },
        requestParameters: {
            ip: '8.8.8.8',
            user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/111.0',
            language: 'en;q=0.8',
            strictness: 1,
            lighter_penalties: false
        }
    }
    const res = await IPQS_API.proxyDetection(privateKey, params).get();
    console.log("Response", res);
```

Documentation:
https://www.ipqualityscore.com/documentation/proxy-detection/overview

## Averages

Proxy Detection Averages is a bit different from the other API endpoints as there are no config options and request parameters are directly passed in.

Methods Available:
```javascript
IPQS_API.averages(privateKey, params).get();
IPQS_API.averages(privateKey, params).post();
```

Example:
```javascript
    import IPQS_API from 'ipqs-node-sdk';

    const privateKey = 'yourPrivateKey'
    const params = {
        country: 'all',
        start_date: '2000-01-01',
        end_date: '2000-01-01',
    }
    const res = await IPQS_API.averages(privateKey, params).get();
    console.log("Response", res);
```

Documentation:
https://www.ipqualityscore.com/documentation/proxy-detection/averages

## Postback

Methods Available:
```javascript
IPQS_API.postback(privateKey, params).get();
```

Example:
```javascript
    import IPQS_API from 'ipqs-node-sdk';
    
    const privateKey = 'yourPrivateKey'
    const params = {
        config: {
            exportType: 'xml',
        },
        requestParameters: {
            request_id: 'your request id'
        },
        updateParameters: {
            ClickDate: '2023-04-10',
            ConversionDate: '2023-04-10',
        }
    }
    const res = await IPQS_API.postback(privateKey, params).get();
    console.log("Response", res);
```

Documentation:
https://www.ipqualityscore.com/documentation/proxy-detection/conversions

## Fraud Report

Methods Available:
```javascript
IPQS_API.report(privateKey, params).get();
```

Example:
```javascript
    import IPQS_API from 'ipqs-node-sdk';
    
    const privateKey = 'yourPrivateKey'
    const params = {
        config: {
            exportType: 'json',
        },
        requestParameters: {
            ip: '8.8.8.8',
        }
    }
    const res = await IPQS_API.report(privateKey, params).get();
    console.log("Response", res);
```

Documentation:
https://www.ipqualityscore.com/documentation/fraud-reporting/overview

## Credit Usage

Methods Available:
```javascript
IPQS_API.creditUsage(privateKey, params).get();
```

Example:
```javascript
    import IPQS_API from 'ipqs-node-sdk';
    
    const privateKey = 'yourPrivateKey'
    const params = {
        config: {
            exportType: 'json'
        },
        requestParameters: {
            ip: '8.8.8.8',
        }
    }
    const res = await IPQS_API.creditUsage(privateKey, params).get();
    console.log("Response", res);
```

https://www.ipqualityscore.com/documentation/usage/overview

## Email Validation

Methods Available:
```javascript
IPQS_API.emailValidation(privateKey, params).get();
IPQS_API.emailValidation(privateKey, params).post();
```

Example:
```javascript
    import IPQS_API from 'ipqs-node-sdk';
    
    const privateKey = 'yourPrivateKey'
    const params = {
        config: {
            exportType: 'json',
            pkAsGetOrPostParam: true,
            pkAsHeader: true
        },
        requestParameters: {
            ip: '8.8.8.8',
            user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/111.0',
            language: 'en;q=0.8',
            strictness: 1,
            lighter_penalties: false
        }
    }
    const res = await IPQS_API.emailValidation(privateKey, params).get();
    console.log("Response", res);
```

Documentation:
https://www.ipqualityscore.com/documentation/email-validation/overview

## Leaked Report

Methods Available:
```javascript
IPQS_API.leakedReport(privateKey, params).get();
```

Example:
```javascript
    import IPQS_API from 'ipqs-node-sdk';
    
    const privateKey = 'yourPrivateKey'
    const params = {
        config: {
            exportType: 'json',
        },
        requestParameters: {
            type: 'email',
            value: 'web@google.com'
        }
    }
    const res = await IPQS_API.leakedReport(privateKey, params).get();
    console.log("Response", res);
```

Documentation:
https://www.ipqualityscore.com/documentation/leaked/overview

## Phone Validation

Methods Available:
```javascript
IPQS_API.phoneValidation(privateKey, params).get();
IPQS_API.phoneValidation(privateKey, params).post();
```

Example:
```javascript
    import IPQS_API from 'ipqs-node-sdk';
    
    const privateKey = 'yourPrivateKey'
    const params = {
        config: {
            exportType: 'json',
            pkAsGetOrPostParam: true,
            pkAsHeader: true
        },
       requestParameters: {
          phone: "18007132618",
       }
    }
    const res = await IPQS_API.phoneValidation(privateKey, params).get();
    console.log("Response", res);
```

Documentation:
https://www.ipqualityscore.com/documentation/phone-number-validation-api/overview

## URL Validation

Methods Available:
```javascript
IPQS_API.urlValidation(privateKey, params).get();
IPQS_API.urlValidation(privateKey, params).post();
```

Example:
```javascript
    import IPQS_API from 'ipqs-node-sdk';
    
    const privateKey = 'yourPrivateKey'
    const params = {
        config: {
            exportType: 'json',
            pkAsGetOrPostParam: true,
            pkAsHeader: true
        },
       requestParameters: {
          url: "http://www.google.com/",
       }
    }
    const res = await IPQS_API.proxyDetection(privateKey, params).get();
    console.log("Response", res);
```

Documentation:
https://www.ipqualityscore.com/documentation/malicious-url-scanner-api/overview

## Request List

Methods Available:
```javascript
IPQS_API.requestLists(privateKey, params).get();
IPQS_API.requestLists(privateKey, params).post();
```

Example:
```javascript
    import IPQS_API from 'ipqs-node-sdk';
    
    const privateKey = 'yourPrivateKey'
    const params = {
        config: {
            exportType: 'json',
            pkAsGetOrPostParam: true,
            pkAsHeader: true
        },
       requestParameters: {
          type: "email",
          start_date: "2020-01-01",
          stop_date: "2024-01-01",
       },
       updateParameters: {
          userID: "userID"
       }
    }
    const res = await IPQS_API.requestLists(privateKey, params).get();
    console.log("Response", res);
```

Documentation:
https://www.ipqualityscore.com/documentation/request-list/overview