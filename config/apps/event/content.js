export default {
     "EventsManagement": {
      "Actions": {
        "Embeded Actions": "",
        "General Actions": [],
        "Selected Item Action": [
          "Edit EventManagement",
          "Clone EventManagement",
          "Delete EventManagement"
        ]
      },
      "Child": {},
      "DataSource": {
        "Key Field": "",
        "Parent key field": "",
        "Type": "List",
        "URL": "Event"
      },
      "General": {
        "Caption": "Events",
        "Name": "Event"
      },
      "Permissions": {
        "Groups": ""
      },
      "UI": {
        "TemplateActions": {
          "new": {
            "function": "function (listName, jsEvent, view) {\n      let rendor = $('.iziModal-table-container');\n    let dayClicked = moment($(event.target).parentNth(3).attr(\"data-date\"),\"YYYY-MM-DD\").toISOString();\n    let parentParaStr = `dayClicked=${dayClicked}`;\n    return prepaireForm(rendor, { formId: 'EventManagementForm', formType: 'SliderForm', action: 'Add', parentPara : parentParaStr });\n}",
            "type": "sync"
          },
          "editeventTemp": {
            "function": "function () { \n    let rendor = $(\".iziModal-table-container\"); \n    let action = { \n        action: \"edit\", \n        data: `ID=${selectedId}`, \n        formId: \"EditEventInfoForm\", \n        formType: \"SliderForm\" \n    }         \n    return prepaireForm(rendor, action); \n} ",
            "type": "sync"
          },
          "afterLoadAttachment": {
            "function": "function (element) {  \n    let $ele = $(element);    \n    let elementId = $ele.attr(\"id\"); \n    let imgType= $ele.attr(\"imgType\");   \n    let attachmentApi = getModuleById(\"$Common\").getIn([\"Setting\", \"AttachmentAPIurl\"]);    \n    let url = `${hostURL}/${attachmentApi}${elementId}`;    \n    axiosWrapper(\"get\", url).then(({        data    }) => {        \n        let {            fileName        } = data;   \n        let str=`<a class=\"img-filename\" href=\"${`${hostURL}/${attachmentApi}download/${elementId}`}\">${fileName}</a><i class=\"fa fa-clone url-copy\" title=\"Copy to clipboard\" copyURL=\"${`${hostURL}/${attachmentApi}download/${elementId}`}\" onclick=\"copyToClipboardImage(this)\" ></i><span class=\"imgType\">${imgType}</span>`\n        if(imgType==\"Other\")\n        {\n            str=`<a class=\"img-filename\" href=\"${`${hostURL}/${attachmentApi}download/${elementId}`}\">${fileName}</a><i class=\"fa fa-clone url-copy\" title=\"Copy to clipboard\" copyURL=\"${`${hostURL}/${attachmentApi}download/${elementId}`}\" onclick=\"copyToClipboardImage(this)\" ></i><span class=\"imgType\"></span>`\n        }\n        \n        $ele.parentNth(2).append(str);    \n    });\n}",
            "type": "sync"
          },
          "editsetting": {
            "function": "function () { \n    let rendor = $(\".iziModal-table-container\"); \n    let action = { \n        action: \"edit\", \n        data: `ID=${selectedId}`, \n        formId: \"EditEventSetting\", \n        formType: \"SliderForm\" \n    }         \n    return prepaireForm(rendor, action); \n}",
            "type": "sync"
          },
          "removeAttachment": {
            "function": "function (event) {\n       if (confirm(\"Are you sure you want to delete this attachment?\")) {\n           return new Promise((res, rej) => {\n         $(\"#mainContainer\").append(\n               `<div class=\"img-loader1\"><img  class=\"inner-loader\" src='images/configuration/loading-large.gif' /></div>`\n           );      let $element = $(event);\n               let attachmentId = $(event).attr(\"data-attchmentid\");\n               let imgtype=$(event).attr(\"imgType\");\n               let relname=imgtype==\"Event Banner\" ? \"BannerImage\" : imgtype==\"Thumbnail Image\" ? \"thumbnailURL\" : imgtype==\"Logo Image\" ? \"LogoURL\" : imgtype==\"Other\" ? \"Others\" :\"getBannerImage\";           if (!_.isEmpty(selectedId) && !_.isEmpty(attachmentId)) {\n                   axiosWrapper(\"DELETE\", `${hostURL}/svc/api/Events/${selectedId}/${relname}/${attachmentId}`)\n                       .then(() => {\n                           $element.parentNth(2).hide();\n                           toastNotification(\"Attachment deleted successfully.\");\n   $(\".img-loader1\").remove();                        res();\n                       })\n                       .catch((e) => {\n      $(\".img-loader1\").remove();                     toastNotification(\"Failed to delete attachment.\");\n                           rej(e);\n                       })\n               }\n           });\n       } else { return new Promise.resolve(); }\n   }",
            "type": "sync"
          },
          "viewliveevent": {
            "function": "function(event){let path = `${baseUrl}apps/${AppRoute.get(\"appName\")}/Events/EventsManagement/views/Live and Draft Events`; \n        $.router.go(path,'EventDetailsForm');}",
            "type": "async"
          },
          "OpenEventRegistration": {
            "function": "function (event,$element) {                             \n  axiosWrapper(\"GET\", `${hostURL}/svc/api/Organizations`)            \n  .then((res) => {                \n    let url=res.data[0].EventRegistrationURL || hostURL;    \n    let seo=$(event).parent().attr(\"seotitle\")? `${$(event).parent().attr(\"seotitle\")}-` :\"\"         \n    window.open(`${url}/events/${seo}${$(event).parent().attr(\"eventId\")}`);             \n  })     }",
            "type": "sync"
          },
          "edit": {
            "function": "function (event,$element) {              let rendor = $(\".iziModal-table-container\");                   \n    let dayClicked = event.start.set({\"hours\":0,\"minutes\":0,\"seconds\":0}).toISOString();          \n    let parentParaStr = `dayClicked=${dayClicked}`;    \n    let action = {        action:\"Edit\",        data:`ID=${event.id}`,        formId:\"EventManagementForm\",        formType:\"SliderForm\" , parentPara: parentParaStr}                \n    return prepaireForm(rendor, action)      \n}",
            "type": "sync"
          },
          "hideRemoveAtachment": {
            "function": "function (curr){\n  \n    $(curr).find(\".removeAttchment\").hide();\n}",
            "type": "sync"
          },
          "closeImg": {
            "function": "function(event){\n$(\".modal\").css(\"display\",\"none\");\n}",
            "type": "sync"
          },
          "publishevent": {
            "function": "function (id){ \n                     let atb= atob(id);    \n             let eventId=atb.search(\"Event\")!=-1 ? getIdFromAtob(id) : id ; \n             let Status={\"Status\":\"Open for registration\"}\n             axiosWrapper(\"Patch\", `${hostURL}/svc/api/Events/${eventId}`, Status)\n             .then((res) => {\n                let path = `${baseUrl}apps/${AppRoute.get(\"appName\")}/Events/EventsManagement/views/Event?id=${eventId}`; \n                            $.router.go(path,'EventDetailsForm');\n             })\n            }",
            "type": "async"
          },
          "gotoEventDetails": {
            "function": "function(event) {\n     let $element = $(event);\n    let campaignId = $element.attr(\"id\");\n    let BusinessType = $element.attr(\"businessType\");\n    let eventview=BusinessType==\"Recurring\" ? \"Recurring Event\" :\"Event\";\n    let atb = atob(campaignId);\n    let id = atb.search(\"Event\") != -1 ? getIdFromAtob(campaignId) : campaignId;\n    let path = `${baseUrl}apps/${AppRoute.get(\"appName\")}/Events/EventsManagement/views/${eventview}?id=${id}`; \n    $.router.go(path, 'EventDetailsForm');\n}",
            "type": "async"
          },
          "displayDefaultQRCode": {
            "function": "function(event){\n $(event).attr(\"src\",\"https://www.qrcode-monkey.com/img/default-preview-qr.svg\"); \n}",
            "type": "sync"
          },
          "editeventList": {
            "function": "function (event){                       let id=$(event).parent().attr(\"id\"); \n                    let atb= atob(id);    \n                    let eventId=atb.search(\"Event\")!=-1 ? getIdFromAtob(id) : id ;                  \n                    let rendor = $(\".iziModal-table-container\");                       \n                    let action = { action: \"edit\",                   \n                    data: `ID=${eventId}`,                    \n                    formId: \"EventManagementForm\",                     \n                    formType: \"SliderForm\"             \n                }         \n                return prepaireForm(rendor, action) ;      \n             }",
            "type": "async"
          },
          "drop": {
            "function": "function(event, delta, revertFunc) { \n    if (confirm(`are you want to update event?`)) { \n            Materialize.toast('Event updated successfully!', 2000); \n            let { id, EndDate } = event.node, eventId = getIdFromAtob(id), start = event.start.toISOString(), end = event.end ? event.end.toISOString() : EndDate, url = `${hostURL}/svc/api/Events/${eventId}`; \n            return axiosWrapper(\"patch\", url, { StartDate: start, EndDate: end });  \n    } else { revertFunc(); return Promise.resolve({ code: 1, message: 'event update cancel' }); } }",
            "type": "async"
          },
          "deleteEvent": {
            "function": "function(id) { \n    if (confirm(`are you want to delete event?`)) { \n        let atb = atob(id); let eventId = atb.search(\"Event\") != -1 ? getIdFromAtob(id) : id; \n        let url = `${hostURL}/svc/api/Events/${eventId}`; \n        $(\"#mainContainer\").append(\n            `<div class=\"img-loader1\"><img  class=\"inner-loader\" src='images/configuration/loading-large.gif' /></div>`\n        );\n        return axiosWrapper(\"delete\", url); \n    } \n    return Promise.resolve(); \n}\n\n",
            "type": "async"
          },
          "showRemoveAtachment": {
            "function": "function (curr){\n    \n    $(curr).find(\".removeAttchment\").show();\n}",
            "type": "sync"
          },
          "editevent": {
            "function": "function(id) {    \n    let productId = getIdFromAtob(id);    \n    let rendor = $(\".iziModal-table-container\");   \n     let action = {        \n         action:\"Add\",        \n         data:`ID=${productId}`,        \n         formId:\"CreateEvent\",        \n         formType:\"SliderForm\",    \n        }    \n        return prepaireForm(rendor, action)\n    }",
            "type": "sync"
          },
          "displayOtherAttachment": {
            "function": "function (element) {\n    let $ele = $(element);\n    let elementId = $ele.attr(\"id\");\n    let attachmentApi = getModuleById(\"$Common\").getIn([\"Setting\", \"AttachmentAPIurl\"]);\n    let url = `${hostURL}/${attachmentApi}${elementId}`;\n    axiosWrapper(\"get\", url).then(({\n        data\n    }) => {\n        let {\n            fileName\n        } = data;\n        let fileExtension = getFileExtension3(fileName);\n        let fileIcon = getIconForExtension(fileExtension);\n        let htm = `<a class=\"other-attachments\" download href=\"${ `${hostURL}/${attachmentApi}download/${elementId}`}\" title=\"${fileName}\" id=\"${elementId}\">                <div class=\"file-attachment-details\">${fileIcon}<div class=\"file-name\">${fileName}</div></div>              </a>`;\n        $($ele).parent().prepend(htm);\n        $($ele).remove();\n    })\n}",
            "type": "sync"
          },
          "previewevent": {
            "function": "function (event) { \n    let id = $(event).parent().attr(\"id\"); \n    let atb = atob(id); \n    let eventId = atb.search(\"Event\") != -1 ? getIdFromAtob(id) : id; \n    let seo = $(event).attr(\"seoTitle\") ? `${$(event).attr(\"seoTitle\")}-` : \"\"; \n    window.open(`${hostURL}/events/${seo}${eventId}`); \n}",
            "type": "async"
          },
          "editseo": {
            "function": "function (){    let rendor = $(\".iziModal-table-container\");                  \n     let action = { action: \"edit\",             \n      data: `ID=${selectedId}`,             \n       formId: \"SEODetailsForm\",            \n         formType: \"SliderForm\"    \n         }\n         return prepaireForm(rendor, action) ;\n        } ",
            "type": "sync"
          },
          "editAppsetting": {
            "function": "function () { \n    let rendor = $(\".iziModal-table-container\"); \n    let action = { \n        action: \"edit\", \n        data: `ID=${selectedId}`, \n        formId: \"EditRecuringSetting\", \n        formType: \"SliderForm\" \n    }         \n    return prepaireForm(rendor, action); \n}",
            "type": "sync"
          },
          "editregPage": {
            "function": "function () { \n    let rendor = $(\".iziModal-table-container\"); \n    let action = { \n        action: \"edit\", \n        data: `ID=${selectedId}`, \n        formId: \"EditRegistrationPageSetting\", \n        formType: \"SliderForm\" \n    }         \n    return prepaireForm(rendor, action); \n}",
            "type": "sync"
          },
          "editrecurringeventTemp": {
            "function": "function () { \n    let rendor = $(\".iziModal-table-container\"); \n    let action = { \n        action: \"edit\", \n        data: `ID=${selectedId}`, \n        formId: \"EditRecurringEventInfoForm\", \n        formType: \"SliderForm\" \n    }         \n    return prepaireForm(rendor, action); \n} ",
            "type": "sync"
          },
          "CloneEvent": {
            "function": "function(e) {  \n    let productId = getIdFromAtob($(e).parentNth(1).attr(\"id\"));    \n    let eventtype =$(e).parentNth(1).attr(\"businessType\");    \n    let formId=eventtype==\"Recurring\" ?\"CloneRecurringEvent\" :\"CloneEventManagement\" ;\n    let rendor = $(\".iziModal-table-container\");   \n     let action = {        \n         action:\"Edit\",        \n         data:`ID=${productId}`,        \n         formId:formId,        \n         formType:\"SliderForm\",    \n        }    \n        return prepaireForm(rendor, action)\n    }",
            "type": "sync"
          },
          "viewImg": {
            "function": "function(event){\n    let $element = $(event);\n    let imgSource = $element.attr(\"src\");\n    let alt = $element.attr(\"alt\");\n    let id = $element.attr(\"id\");\n    let modal = $(`#md-${id}`);\n    let modalImg = modal.find(\"img\");\n    let captionText = modal.find(\".caption\");\n\n    modal.css(\"display\",\"flex\");\n    modalImg.attr(\"src\",imgSource);\n    captionText.text(alt);\n}",
            "type": "sync"
          },
          "goToDetails": {
            "function": "function(event){ let $element = $(event);\n     let campaignId = $element.parentNth(2).attr(\"id\");\n   let atb= atob(campaignId);\n    let id=atb.search(\"Event\")!=-1 ? getIdFromAtob(campaignId) : campaignId ;\n let BusinessType = $element.attr(\"businessType\");\n    let eventview=BusinessType==\"Recurring\" ? \"Recurring Event\" :\"Event\";      let basePath = location.pathname;  let path = `${baseUrl}apps/${AppRoute.get(\"appName\")}/${AppRoute.get(\"section\")}/${AppRoute.get(\"navLink\")}/views/${eventview}?id=${id }`; let search = location.search; \n $.router.go(path,'EventDetailsForm');  \n}",
            "type": "async"
          }
        },
        "Card View Template": "VisitingCard0",
        "Width": "50%",
        "Height": "",
        "TemplateHelpers": {
          "computed": {
            "ifstatuShow": "function(item, options) {\n    let obj = _.filter(item,(val)=>{ return val.node.Status==\"Not ready\"}); if (obj.length) {\n        return options.fn(this);\n    }\n    return options.inverse(this);\n}",
            "getFirstImgSource": "function (obj = \"\", options) {    \n  let imgSourcePath = `${hostURL}/svc/api/Attachments/download/`;    \n  if (obj.length>0) {      \n  return `${imgSourcePath}${obj[1]}`;    \n}    \nreturn ``;  }",
            "initial": "function (obj,options) {  \n    let first = options.hash.first;  \n        if(_.isEmpty(obj[first])||_.isEmpty(obj[last])){\n        return ''\n    }\n    return `${obj[first].charAt(0).toUpperCase()}`;\n}",
            "ifLiveShow": "function(item, options) {\n    let obj = _.filter(item,(val)=>{ return val.node.Status!=\"Not ready\"}); if (obj.length) {\n        return options.fn(this);\n    }\n    return options.inverse(this);\n}",
            "ifNotstatus": "function(Status,options){ \n    if(Status=='Not ready')\n{\n        return options.inverse(this);\n}  \n return options.fn(this);\n}",
            "getRandomColor": "function(ob=\"\",options){ let color = GeoPattern.generate(ob).color; return color }",
            "ifstatus": "function(Status,options){ \n       if(Status=='Not ready')\n    {\n             return options.fn(this);\n    }\n    return options.inverse(this);\n}",
            "getdateTime": "function(date) {var date1= moment(date); return moment(date1, \"L\", Intl.DateTimeFormat().resolvedOptions().locale, false).format(\"lll\");}",
            "get_day": "function get_day(obj, options) {var date1 = moment(obj);\n return date1.format('DD') }",
            "date_diff": "function date_diff(obj, options) { \n  var date1 = moment(obj); \n  var date2 = moment(new Date());\n   var duration = moment.duration(date1.diff(date2)); \n   if (date2 > date1) { \n     return moment(date1, \"L\", Intl.DateTimeFormat().resolvedOptions().locale, false).format(\"lll\"); \n    }\n    if (duration.years())     { \n      let msg=duration.months() ? duration.months()==1 ? duration.months() + \" month \" : duration.months() + \" months \" :\"\";\n        return duration.years()==1 ? duration.years() + \" year \" + msg + \" to go\" : duration.years() + \" years \" + msg + \" to go\";\n    }  \n    if (duration.months())     { \n      let msg=duration.days() ? duration.days()==1 ? duration.days() + \" day \" : duration.days() + \" days \" :\"\";\n        return duration.months()==1 ? duration.months() + \" month \" + msg + \" to go\" : duration.months() + \" months \" + msg + \" to go\";\n    }   \n    if (duration.days())     { \n    let msg=duration.hours() ? duration.hours()==1 ? duration.hours() + \" hour \" : duration.hours() + \" hours \" :\"\";\n        return duration.days()==1 ? duration.days() + \" day \" + msg + \" to go\" : duration.days() + \" days \" + msg + \" to go\";\n    }     \n    if (duration.hours())         { \n    let msg=duration.minutes() ? duration.minutes()==1 ? duration.minutes() + \" minute \" : duration.minutes() + \" minutes \" :\"\";\n        return duration.hours()==1 ? duration.hours() + \" hour \" + msg + \" to go\" : duration.hours() + \" hours \" + msg + \" to go\";\n    }     \n    if (duration.minutes())         { \n    let msg=duration.seconds() ? duration.seconds()==1 ? duration.seconds() + \" second \" : duration.seconds() + \" seconds \" :\"\";\n        return duration.minutes()==1 ? duration.minutes() + \" minute \" + msg + \" to go\" : duration.minutes() + \" minutes \" + msg + \" to go\";\n    }     \n    if (duration.seconds() && duration.seconds() > 0)     { \n    \n        return duration.seconds()==1 ? duration.seconds() + \" second to go\" : duration.seconds() + \" seconds to go\";\n    }\n          }",
            "get_month": "function get_day(obj, options) {\n   var date1 = moment(obj);\n return date1.format('MMM') }",
            "ifNotsize": "function(Size,options){ \n            if(Size=='B010 - ID Card Badge (54mm x 76mm)')\n{\n                 return options.fn(this);\n}  \n return options.inverse(this);\n}",
            "getAtob": "function(id){\n     return getIdFromAtob(id)\n}",
            "ifsize": "function(Size,options){ \n               if(Size=='B004 - Pin Name Badge (98mm x 52mm)')\n    {\n                     return options.fn(this);\n    }\n    return options.inverse(this);\n}"
          }
        },
        "IsEditable": "No",
        "Display Order": "",
        "Map View Template": "",
        "Calendar View Template": "calendarEvent",
        "List View Template": "",
        "Detail View": "tab",
        "Column": "",
        "Tile View": "",
        "Templates": {
          "calendarEvent": "<style>\n    .cal-content{\n        color: white;\n        display: flex;\n        flex-direction: row;\n        justify-content: space-between;\n    }\n     .cal-content i{\n          color: white;\n     }\n    .cal-content.Event{\n        background: green;\n    }\n    .cal-content{\n        padding: 0 2px;\n     }\n    .fc-day-grid-event{\n        padding: 0;\n        border: 0;\n    }\n</style>\n<div class=\"cal-content {{node.__typename}}\">\n    <span class=\"fc-title\">\n        {{title}}\n    </span>\n   <span class=\"cal-del-act\" onClick=\"invokeAction('deleteEvent','{{node.id}}','{{node.__typename}}')\">\n        <i class=\"fa fa-trash\" title=\"delete event\"></i>\n    </span>\n</div>\n",
          "EndDate": "<div>{{#if EndDate}}{{getdateTime EndDate}}{{/if}}</div>",
          "StartDate": "<div>{{#if StartDate}}{{getdateTime StartDate}}{{/if}}</div>",
          "VisitingCard0": "EventMangment_Card_View",
          "Title": "<div onclick=\"invokeAction('goToDetails', this)\" businessType=\"{{BusinessType}}\" data-action=\"edit\" data-bind=\"ID={{id}}\" style=\"cursor: pointer;color: #1a73e8;\"> {{Title}} </div>"
        },
        "decorator": {
          "Attachment": "",
          "LinkedinURL": ""
        }
      },
      "Views": {
        "Seat Layout": {
          "Default": "true",
          "DataSource": {
            "FormID": "AddSeatMap",
            "Params": {
              "id": {
                "type": "string",
                "mapwith": "id"
              }
            },
            "Parent key field": "",
            "Sharepoint Action": "Add",
            "Type": "Form",
            "URL": "Event"
          },
          "Query": "",
          "Visible": false,
          "FilterRule": "{ \"where\": {} }",
          "Title": "Seat Layout",
          "Fields": {
            "Title": {
              "displayOrder": 2,
              "caption": "Title",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "180px"
            },
            "Status": {
              "displayOrder": 2,
              "caption": "Status",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "180px"
            },
            "Type": {
              "displayOrder": 3,
              "caption": "Type",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "180px"
            },
            "TemplateName": {
              "displayOrder": 4,
              "caption": "TemplateName",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "180px"
            },
            "createdBy": {
              "displayOrder": 5,
              "caption": "createdBy",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "180px"
            },
            "createdDate": {
              "displayOrder": 1,
              "caption": "createdDate",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "180px"
            }
          },
          "type": "Form",
          "DefaultSort": "createdDate DESC"
        },
        "Invite": {
          "Default": "true",
          "DataSource": {
            "FormID": "InviteDetailsForm",
            "Params": {
              "id": {
                "type": "string",
                "mapwith": "id"
              }
            },
            "Parent key field": "",
            "Sharepoint Action": "Edit",
            "Type": "Form",
            "URL": "Event"
          },
          "Query": "",
          "Visible": false,
          "FilterRule": "{ \"where\": {} }",
          "Title": "Invite",
          "Fields": {
            "Title": {
              "displayOrder": 1,
              "caption": "Title",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "180px"
            },
            "Status": {
              "displayOrder": 2,
              "caption": "Status",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "180px"
            },
            "Type": {
              "displayOrder": 3,
              "caption": "Type",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "180px"
            },
            "TemplateName": {
              "displayOrder": 4,
              "caption": "TemplateName",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "180px"
            },
            "createdBy": {
              "displayOrder": 5,
              "caption": "createdBy",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "180px"
            },
            "createdDate": {
              "displayOrder": 6,
              "caption": "createdDate",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "180px"
            }
          },
          "type": "Form",
          "DefaultSort": "createdDate DESC"
        },
        "Invites": {
          "Default": "true",
          "DataSource": {
            "FormID": "InviteHistoryDetailsForm",
            "Params": {
              "id": {
                "type": "string",
                "mapwith": "id"
              }
            },
            "Parent key field": "",
            "Sharepoint Action": "Add",
            "Type": "Form",
            "URL": "Event"
          },
          "Query": "",
          "Visible": false,
          "FilterRule": "{ \"where\": {} }",
          "Title": "Invites",
          "Fields": {
            "Title": {
              "displayOrder": 2,
              "caption": "Title",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "180px"
            },
            "Status": {
              "displayOrder": 2,
              "caption": "Status",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "180px"
            },
            "Type": {
              "displayOrder": 3,
              "caption": "Type",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "180px"
            },
            "TemplateName": {
              "displayOrder": 4,
              "caption": "TemplateName",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "180px"
            },
            "createdBy": {
              "displayOrder": 5,
              "caption": "createdBy",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "180px"
            },
            "createdDate": {
              "displayOrder": 1,
              "caption": "createdDate",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "180px"
            }
          },
          "type": "Form",
          "DefaultSort": "createdDate DESC"
        },
        "Past": {
          "Actions": {
            "Embeded Actions": "",
            "General Actions": [],
            "Selected Item Action": []
          },
          "binding": {
            "tod": "moment.utc().format()"
          },
          "Fields": {
            "_VenueAddress.PostalCode": {
              "displayOrder": 10,
              "caption": "Postal Code",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "130px"
            },
            "_VenueAddress.State": {
              "displayOrder": 9,
              "caption": "State",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "140px"
            },
            "Privacy": {
              "displayOrder": 4,
              "caption": "Privacy",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "130px"
            },
            "EndDate": {
              "displayOrder": 3,
              "caption": "EndDate",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "130px"
            },
            "_VenueAddress.Country": {
              "displayOrder": 11,
              "caption": "Country",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "130px"
            },
            "StartDate": {
              "displayOrder": 2,
              "caption": "Start Date",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "130px"
            },
            "Currency": {
              "displayOrder": 12,
              "caption": "Currency",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "100px"
            },
            "_VenueAddress.City": {
              "displayOrder": 8,
              "caption": "City",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "130px"
            },
            "createdDate": {
              "displayOrder": 13,
              "caption": "created Date",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "130px"
            },
            "Title": {
              "displayOrder": 1,
              "caption": "Title",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "150px"
            },
            "Tags": {
              "displayOrder": 5,
              "caption": "Tags",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "150px"
            },
            "VenueName": {
              "displayOrder": 6,
              "caption": "Venue Name",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "180px"
            },
            "_VenueAddress.AddressLine": {
              "displayOrder": 7,
              "caption": "Address Line",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "180px"
            }
          },
          "FilterRule": "{ \"where\":{ \"and\":[{\"EndDate\":{\"lte\":\"@tod\"}}]} }",
          "List Name": "Event",
          "QueryType": "axios",
          "Query": "query ($filters: JSON, $where: JSON) { Event { EventFind(filter: $filters) { edges { node { SeatReservation Privacy BusinessType EndDate ShowRemainingTickets StartDate Currency CancellationPolicy MaxNoRegistrations EventCountdown Title Timezone Tags Project MinDaysCancelling VenueName id LegalEntity Description IsOnlineEvent createdDate createdBy modifiedDate modifiedBy Images Logo Thumbnail _VenueAddress { Country PostalCode State City AddressLine id } } } } EventCount(where: $where) } }",
          "Title": "Past"
        },
        "Registration Types": {
          "Default": "true",
          "DataSource": {
            "FormID": "RegistrationTypesDetailsForm",
            "Params": {
              "id": {
                "type": "string",
                "mapwith": "id"
              }
            },
            "Parent key field": "",
            "Sharepoint Action": "Add",
            "Type": "Form",
            "URL": "Event"
          },
          "Query": "",
          "Visible": false,
          "FilterRule": "{ \"where\": {} }",
          "Title": "Registration Types",
          "Fields": {
            "Title": {
              "displayOrder": 2,
              "caption": "Title",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "180px"
            },
            "Status": {
              "displayOrder": 2,
              "caption": "Status",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "180px"
            },
            "Type": {
              "displayOrder": 3,
              "caption": "Type",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "180px"
            },
            "TemplateName": {
              "displayOrder": 4,
              "caption": "TemplateName",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "180px"
            },
            "createdBy": {
              "displayOrder": 5,
              "caption": "createdBy",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "180px"
            },
            "createdDate": {
              "displayOrder": 1,
              "caption": "createdDate",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "180px"
            }
          },
          "type": "Form",
          "DefaultSort": "createdDate DESC"
        },
        "Live and Draft Events": {
          "Default": true,
          "QueryType": "axios",
          "binding": {
            "tod": "moment.utc().format()"
          },
          "Query": "query ($filters: JSON, $where: JSON) { Event { EventFind(filter: $filters) { edges { node { StartDate Images BusinessType Title Timezone Tags Duration VenueName id LegalEntity Status createdDate createdBy modifiedDate Logo Thumbnail _VenueAddress { Country PostalCode State City AddressLine id } } } } EventCount(where: $where) } }",
          "UI": {
            "List View Template": "Live_Draft_Event",
            "Pagination": "pagingwithpage"
          },
          "FilterRule": "{\"where\":{\"or\":[{\"and\":[{\"or\":[{\"StartDate\":{\"lte\":\"@tod\"}},{\"StartDate\":{\"gte\":\"@tod\"}},{\"StartDate\":{\"exists\":false}}, { \"StartDate\": null }]},{\"or\":[{\"StartDate\":{\"gte\":\"@tod\"}},{\"StartDate\":{\"exists\":false}}, { \"StartDate\": null }]}]},{\"Status\":\"Not ready\"}]}}",
          "Title": "Live and Draft Events",
          "Fields": {
            "_VenueAddress.PostalCode": {
              "displayOrder": 10,
              "caption": "_VenueAddress.PostalCode",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "130px"
            },
            "_VenueAddress.State": {
              "displayOrder": 9,
              "caption": "_VenueAddress.State",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "140px"
            },
            "Privacy": {
              "displayOrder": 4,
              "caption": "Privacy",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "130px"
            },
            "EndDate": {
              "displayOrder": 3,
              "caption": "EndDate",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "130px"
            },
            "_VenueAddress.Country": {
              "displayOrder": 11,
              "caption": "_VenueAddress.Country",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "130px"
            },
            "StartDate": {
              "displayOrder": 2,
              "caption": "StartDate",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "130px"
            },
            "Currency": {
              "displayOrder": 12,
              "caption": "Currency",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "100px"
            },
            "_VenueAddress.City": {
              "displayOrder": 8,
              "caption": "_VenueAddress.City",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "130px"
            },
            "createdDate": {
              "displayOrder": 13,
              "caption": "createdDate",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "130px"
            },
            "Title": {
              "displayOrder": 1,
              "caption": "Title",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "150px"
            },
            "Tags": {
              "displayOrder": 5,
              "caption": "Tags",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "150px"
            },
            "VenueName": {
              "displayOrder": 6,
              "caption": "VenueName",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "180px"
            },
            "_VenueAddress.AddressLine": {
              "displayOrder": 7,
              "caption": "_VenueAddress.AddressLine",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "180px"
            }
          },
          "type": "List",
          "DefaultSort": "createdDate DESC"
        },
        "Schedule": {
          "Default": "true",
          "DataSource": {
            "FormID": "SessionSlots",
            "Params": {
              "id": {
                "type": "string",
                "mapwith": "id"
              }
            },
            "Parent key field": "",
            "Sharepoint Action": "Add",
            "Type": "Form",
            "URL": "Event"
          },
          "Query": "",
          "Visible": false,
          "FilterRule": "{ \"where\": {} }",
          "Title": "Schedule",
          "Fields": {
            "Title": {
              "displayOrder": 2,
              "caption": "Title",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "180px"
            },
            "Status": {
              "displayOrder": 2,
              "caption": "Status",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "180px"
            },
            "Type": {
              "displayOrder": 3,
              "caption": "Type",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "180px"
            },
            "TemplateName": {
              "displayOrder": 4,
              "caption": "TemplateName",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "180px"
            },
            "createdBy": {
              "displayOrder": 5,
              "caption": "createdBy",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "180px"
            },
            "createdDate": {
              "displayOrder": 1,
              "caption": "createdDate",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "180px"
            }
          },
          "type": "Form",
          "DefaultSort": "createdDate DESC"
        },
        "Recurring Event": {
          "Fields": {
            "_VenueAddress.PostalCode": {
              "displayOrder": 10,
              "caption": "_VenueAddress.PostalCode",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "130px"
            },
            "_VenueAddress.State": {
              "displayOrder": 9,
              "caption": "_VenueAddress.State",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "140px"
            },
            "Privacy": {
              "displayOrder": 4,
              "caption": "Privacy",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "130px"
            },
            "EndDate": {
              "displayOrder": 3,
              "caption": "EndDate",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "130px"
            },
            "_VenueAddress.Country": {
              "displayOrder": 11,
              "caption": "_VenueAddress.Country",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "130px"
            },
            "StartDate": {
              "displayOrder": 2,
              "caption": "StartDate",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "130px"
            },
            "Currency": {
              "displayOrder": 12,
              "caption": "Currency",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "100px"
            },
            "_VenueAddress.City": {
              "displayOrder": 8,
              "caption": "_VenueAddress.City",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "130px"
            },
            "createdDate": {
              "displayOrder": 13,
              "caption": "createdDate",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "130px"
            },
            "Title": {
              "displayOrder": 1,
              "caption": "Title",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "150px"
            },
            "Tags": {
              "displayOrder": 5,
              "caption": "Tags",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "150px"
            },
            "VenueName": {
              "displayOrder": 6,
              "caption": "VenueName",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "180px"
            },
            "_VenueAddress.AddressLine": {
              "displayOrder": 7,
              "caption": "_VenueAddress.AddressLine",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "180px"
            }
          },
          "DataSource": {
            "FormID": "AppointmentsDetailsForm",
            "Params": {
              "id": {
                "type": "string",
                "mapwith": "id"
              }
            },
            "Parent key field": "",
            "Sharepoint Action": "Edit",
            "Type": "Form",
            "URL": "Event"
          },
          "type": "Form",
          "QueryType": "axios",
          "Query": "",
          "Visible": false,
          "Title": "Recurring Event"
        },
        "All Events": {
          "DefaultSort": "createdDate DESC",
          "Fields": {
            "_VenueAddress.PostalCode": {
              "displayOrder": 10,
              "caption": "Postal Code",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "160px",
              "filterEnable":true,
              "hidden":false,
              "editable": true,
            },
            "_VenueAddress.State": {
              "displayOrder": 9,
              "caption": "State",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "140px"
            },
            "Privacy": {
              "displayOrder": 4,
              "caption": "Privacy",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "130px"
            },
            "EndDate": {
              "displayOrder": 3,
              "caption": "EndDate",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "130px"
            },
            "_VenueAddress.Country": {
              "displayOrder": 11,
              "caption": "Country",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "130px"
            },
            "StartDate": {
              "displayOrder": 2,
              "caption": "Start Date",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "130px"
            },
            "Currency": {
              "displayOrder": 12,
              "caption": "Currency",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "130px"
            },
            "_VenueAddress.City": {
              "displayOrder": 8,
              "caption": "City",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "130px"
            },
            "createdDate": {
              "displayOrder": 13,
              "caption": "createdDate",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "160px"
            },
            "Title": {
              "displayOrder": 1,
              "caption": "Title",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "150px"
            },
            "Tags": {
              "displayOrder": 5,
              "caption": "Tags",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "150px"
            },
            "VenueName": {
              "displayOrder": 6,
              "caption": "Venue",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "180px"
            },
            "_VenueAddress.AddressLine": {
              "displayOrder": 7,
              "caption": "Address",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "180px"
            }
          },
          "InlineEditing":true,
          "DialogEditing":true,
          "Query": "",
          "QueryType": "axios",
          "Title": "All Events"
        },
        "Event": {
          "Fields": {
            "_VenueAddress.PostalCode": {
              "displayOrder": 10,
              "caption": "_VenueAddress.PostalCode",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "130px"
            },
            "_VenueAddress.State": {
              "displayOrder": 9,
              "caption": "_VenueAddress.State",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "140px"
            },
            "Privacy": {
              "displayOrder": 4,
              "caption": "Privacy",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "130px"
            },
            "EndDate": {
              "displayOrder": 3,
              "caption": "EndDate",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "130px"
            },
            "_VenueAddress.Country": {
              "displayOrder": 11,
              "caption": "_VenueAddress.Country",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "130px"
            },
            "StartDate": {
              "displayOrder": 2,
              "caption": "StartDate",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "130px"
            },
            "Currency": {
              "displayOrder": 12,
              "caption": "Currency",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "100px"
            },
            "Duration": {
              "displayOrder": 9,
              "caption": "Duration",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "180px"
            },
            "_VenueAddress.City": {
              "displayOrder": 8,
              "caption": "_VenueAddress.City",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "130px"
            },
            "createdDate": {
              "displayOrder": 13,
              "caption": "createdDate",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "130px"
            },
            "Title": {
              "displayOrder": 1,
              "caption": "Title",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "150px"
            },
            "Tags": {
              "displayOrder": 5,
              "caption": "Tags",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "150px"
            },
            "VenueName": {
              "displayOrder": 6,
              "caption": "VenueName",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "180px"
            },
            "_VenueAddress.AddressLine": {
              "displayOrder": 7,
              "caption": "_VenueAddress.AddressLine",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "180px"
            }
          },
          "DataSource": {
            "FormID": "EventDetailsForm",
            "Params": {
              "id": {
                "type": "string",
                "mapwith": "id"
              }
            },
            "Parent key field": "",
            "Sharepoint Action": "Edit",
            "Type": "Form",
            "URL": "Event"
          },
          "type": "Form",
          "QueryType": "axios",
          "Query": "",
          "Visible": false,
          "Title": "Event"
        },
        "Not Available": {
          "Default": "true",
          "DataSource": {
            "FormID": "NotAvailableSession",
            "Params": {
              "id": {
                "type": "string",
                "mapwith": "id"
              }
            },
            "Parent key field": "",
            "Sharepoint Action": "Add",
            "Type": "Form",
            "URL": "Event"
          },
          "Query": "",
          "Visible": false,
          "FilterRule": "{ \"where\": {} }",
          "Title": "Not Available",
          "Fields": {
            "Title": {
              "displayOrder": 2,
              "caption": "Title",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "180px"
            },
            "Status": {
              "displayOrder": 2,
              "caption": "Status",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "180px"
            },
            "Type": {
              "displayOrder": 3,
              "caption": "Type",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "180px"
            },
            "TemplateName": {
              "displayOrder": 4,
              "caption": "TemplateName",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "180px"
            },
            "createdBy": {
              "displayOrder": 5,
              "caption": "createdBy",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "180px"
            },
            "createdDate": {
              "displayOrder": 1,
              "caption": "createdDate",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "180px"
            }
          },
          "type": "Form",
          "DefaultSort": "createdDate DESC"
        },
        "Calendar": {
          "calendarFields": {
            "Event": {
              "Description": "Title",
              "End": "EndDate",
              "Start": "StartDate"
            }
          },
          "UI": {
            "Calendar View Template": "calendarEvent"
          },
          "Fields": [
            "Title",
            "StartDate",
            "EndDate",
            "Privacy",
            "Tags",
            "VenueName",
            "Currency",
            "createdDate"
          ],
          "Query": "query($filters: JSON,$where: JSON) {\n  Event {\n    EventFind(filter: $filters) {\n      edges {\n        node {\n          id\n          StartDate\n          EndDate\n          Title\n          Tags\n          VenueName\n          Currency\n          createdDate\n          Privacy\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    EventCount(where:$where)\n    __typename\n  }\n}\n",
          "Title": "Calendar",
          "type": "Calander",
          "isFilter": false
        },
        "Integrations": {
          "Default": "true",
          "DataSource": {
            "FormID": "IntegrationsDetailsForm",
            "Params": {
              "id": {
                "type": "string",
                "mapwith": "id"
              }
            },
            "Parent key field": "",
            "Sharepoint Action": "Add",
            "Type": "Form",
            "URL": "Event"
          },
          "Query": "",
          "Visible": false,
          "FilterRule": "{ \"where\": {} }",
          "Title": "Integrations",
          "Fields": {
            "Title": {
              "displayOrder": 2,
              "caption": "Title",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "180px"
            },
            "Status": {
              "displayOrder": 2,
              "caption": "Status",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "180px"
            },
            "Type": {
              "displayOrder": 3,
              "caption": "Type",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "180px"
            },
            "TemplateName": {
              "displayOrder": 4,
              "caption": "TemplateName",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "180px"
            },
            "createdBy": {
              "displayOrder": 5,
              "caption": "createdBy",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "180px"
            },
            "createdDate": {
              "displayOrder": 1,
              "caption": "createdDate",
              "searchEnable": true,
              "sortEnable": true,
              "columnWidth": "180px"
            }
          },
          "type": "Form",
          "DefaultSort": "createdDate DESC"
        }
      }
    }
}