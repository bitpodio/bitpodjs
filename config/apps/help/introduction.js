export default function (config) {
  return {
    general: {
      title: 'Common.Introduction',
      displayOrder: 1,
    },
    views: {
      QuickStart: {
        title: 'Common.QuickStart',
        type: 'page',
        displayOrder: 1,
        to: '/apps/help-center/introduction/quick-start',
        dataSource: {
          type: 'iFrame',
          url:
            'https://docs.google.com/document/d/e/2PACX-1vQm8lKlBvnAgdt-JLzNoJBwTkxPqftUc7kujjGTP0nf7e_4pUeSYz1OqbFjGmyBxiWsICu6qh6sJJE-/pub?embedded=true',
          role: 'document',
        },
      },
      AboutApi: {
        title: 'Common.AboutApi',
        type: 'page',
        displayOrder: 2,
        to: '/apps/help-center/introduction/about-api',
        dataSource: {
          type: 'iFrame',
          url:
            'https://docs.google.com/document/d/e/2PACX-1vSk3XUyXi7nYcRr0X8-mjjgUCAJcYEaPIXjPnu3VGUa-feD933h_u_fSgYxm4DcVszM6mGR-D1I5bma/pub?embedded=true',
          role: 'document',
        },
      },
      ApiExplorer: {
        title: 'Common.ApiExplorer',
        type: 'page',
        displayOrder: 3,
        to: '/apps/help-center/introduction/api-explorer',
        dataSource: {
          type: 'iFrame',
          url: `https://${config.studioUrl}/swagger.html?url=${config.swaggerUrl}`,
          role: 'application',
        },
      },
      GcpMarketplace: {
        title: 'Common.GcpMarketplace',
        type: 'page',
        displayOrder: 4,
        to: '/apps/help-center/introduction/gcp-marketplace',
        dataSource: {
          type: 'iFrame',
          url:
            'https://docs.google.com/document/d/e/2PACX-1vQSVQFSsDcrrcqbmk-1fpyzeW_k7fEIWTLcwKzBt8s4H-mrhUdaKTzFkVJ-SowZinolWXGIR4hYiiHh/pub?embedded=true',
          role: 'document',
        },
      },
      ReleaseNotes: {
        title: 'Common.ReleaseNotes',
        type: 'page',
        displayOrder: 5,
        to: '/apps/help-center/introduction/release-notes',
        dataSource: {
          type: 'iFrame',
          url:
            'https://docs.google.com/document/d/e/2PACX-1vQV-pY4KLWp5MM1ojCONUKOfqgDTlxCucFuwa5bEDqemLSZIm3F2C7ClwYgoR77RjT0AzNCYM-drR8T/pub?embedded=true',
          role: 'document',
        },
      },
      Faq: {
        title: 'Common.Faqs',
        type: 'page',
        displayOrder: 6,
        to: '/apps/help-center/introduction/faq',
        dataSource: {
          type: 'iFrame',
          url:
            'https://docs.google.com/document/d/e/2PACX-1vT_ez_GSM2-tLoUIO5lTFx73_UX5fp7hzv9ye3bndgFKP7MJboe8brRS_lWxtxhDoo6JG9-IXXuWxYU/pub?embedded=true',
          role: 'document',
        },
      },
      SecurityPolicy: {
        title: 'Common.SecurityPolicy',
        type: 'page',
        displayOrder: 7,
        to: '/apps/help-center/introduction/security-policy',
        dataSource: {
          type: 'iFrame',
          url:
            'https://docs.google.com/document/d/e/2PACX-1vSsHw-wS9VHpbb58qAKn9zlSs_y3lneIIpSo7xcwYG26P1QIjNuj6I5KNEB1yAsIOjxvgWKly3Jlllg/pub?embedded=true',
          role: 'document',
        },
      },
    },
  }
}
