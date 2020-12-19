export const sidebarData = [
	{
		name: "intro",
		permission: "intro",
		routepath: "/intro",
		iconClass: "fas fa-chalkboard",
	},
	{
		name: "dashboard",
		permission: "am.dashboard",
		routepath: "/am-dashboard",
		iconClass: "fas fa-chalkboard",
	},
	{
		name: "dashboard",
		permission: "insurer.dashboard",
		routepath: "/insurer-dashboard",
		iconClass: "fas fa-chalkboard",
	},
	{
		name: "dashboard",
		permission: "company.dashboard",
		routepath: "/company-dashboard",
		iconClass: "fas fa-chalkboard",
	},
	{
		name: "view claims",
		permission: "am.viewclaims",
		routepath: "/am-view-claims",
		iconClass: "fas fa-file",
	},
	{
		name: "dashboard",
		permission: "cm.dashboard",
		routepath: "/cm-dashboard",
		iconClass: "fas fa-chalkboard",
	},
	{
		name: "medical escalation",
		permission: "medical_escalation",
		iconClass: "fas fa-angle-double-up",
		child: [
			{
				listname: "All Escalations",
				permission: "medical_escalation.all_escalations",
				routepath: "/medical_escalations/all",
				shortname: "Ae",
			},
		],
	},
	{
		name: "orders",
		permission: "orders",
		iconClass: "fas fa-angle-double-up",
		child: [
			{
				listname: "All Orders",
				permission: "orders.all",
				routepath: "/orders/all",
				shortname: "Ae",
			},
		],
	},
	{
		name: "early warning",
		permission: "earlywarning",
		routepath: "/early-warning",
		iconClass: "fas fa-bell",
	},
	{
		name: "Company List",
		permission: "company.listview",
		routepath: "/company-list",
		iconClass: "fas fa-list-ul",
	},
	{
		name: "company",
		permission: "company",
		iconClass: "fas fa-city",
		child: [
			{
				listname: "Overview",
				permission: "company.cmoverview",
				routepath: "/company/cmoverview",
				shortname: "Ov",
			},
			{
				listname: "Productivity",
				permission: "company.cmproductivity",
				routepath: "/company/cmproductivity",
				shortname: "Pd",
			},
			{
				listname: "Claims Breakdown",
				permission: "company.cmbreakdown",
				routepath: "/company/cmbreakdown",
				shortname: "Br",
			},
			{
				listname: "GL Statistics",
				permission: "company.glstatistics",
				iconClass: "fas fa-child",
				child: [
					{
						listname: "Overview",
						permission: "company.glstatistics.cmoverview",
						routepath: "/company/glstatistics/cmoverview",
						shortname: "Ov",
                    },
					{
						listname: "Initial GL",
						permission: "company.glstatistics.initialgl",
						routepath: "/company/glstatistics/initial-gl",
						shortname: "Ig",
					},
					{
						listname: "Decline GL",
						permission: "company.glstatistics.declinegl",
						routepath: "/company/glstatistics/decline-gl",
						shortname: "Dg",
					},
					{
						listname: "Final GL",
						permission: "company.glstatistics.finalgl",
						routepath: "/company/glstatistics/final-gl",
						shortname: "Fg",
					},
				],
			},
			{
				listname: "Medical Profiles",
				permission: "company.cmprofiles",
				iconClass: "fas fa-user",
				child: [
					{
						listname: "Inpatient",
						permission: "company.cmprofiles.inpatient",
						routepath: "/company/cmprofiles/inpatient",
						shortname: "Ip",
					},
					{
						listname: "Outpatient GP",
						permission: "company.cmprofiles.gpoutpatient",
						routepath: "/company/cmprofiles/gpoutpatient",
						shortname: "Gp",
					},
					{
						listname: "Outpatient SP",
						permission: "company.cmprofiles.inpatient",
						routepath: "/company/cmprofiles/spoutpatient",
						shortname: "Sp",
					},
				],
			},
		],
	},
	{
		name: "patient",
		permission: "patient",
		iconClass: "fas fa-child",
		child: [
			{
				listname: "Overview",
				permission: "patient.cmoverview",
				routepath: "/patient/cmoverview",
				shortname: "Ov",
			},
		],
	},
	{
		name: "clinic",
		permission: "clinic",
		iconClass: "fas fa-ambulance",
		child: [
			{
				listname: "Overview",
				permission: "clinic.cmoverview",
				routepath: "/clinic/cmoverview",
				shortname: "Ov",
			},
		],
	},
	{
		name: "diagnosis",
		permission: "diagnosis",
		iconClass: "fas fa-band-aid",
		child: [
			{
				listname: "Overview",
				permission: "diagnosis.cmoverview",
				routepath: "/diagnosis/cmoverview",
				shortname: "Ov",
			},
		],
	},
	{
		name: "reports",
		permission: "reports",
		iconClass: "fas fa-file",
		child: [
			{
				listname: "Generate PPT",
				permission: "reports.generateppt",
				routepath: "/reports/generate",
				shortname: "CT",
			},
		],
	},
	{
		name: "alert escalations",
		permission: "alert.escalation",
		routepath: "/alert-escalations",
		iconClass: "fas fa-exclamation",
    },
	{
		name: "accounts",
		permission: "accounts",
        iconClass: "fas fa-user",
        child: [
			{
				listname: "Management",
				permission: "account.management",
				routepath: "/account/management",
				shortname: "AM",
            },
            {
				listname: "WhiteLabel Setting",
				permission: "account.whitelabelsettings",
				routepath: "/account/whitelabelsettings",
				shortname: "WS",
            },
            {
				listname: "Role Management",
				permission: "account.rolesmanagement",
				routepath: "/account/roles",
				shortname: "RM",
			}
		],
	},
];

// Comments:::::::

//  If you want one level child then look below example

/*
  {
	name: 'sidebar.forms',
	iconClass: 'fab fa-wpforms',
	child: [
	  {
		listname: 'sidebar.regularforms',
		routepath: '/regularform',
		shortname: 'RF'
	  }
	]
  }
*/

//  If you want Second level child then look below example

/*
   {
	  name: 'sidebar.pages',
	  iconClass: 'fas fa-print',
	  child: [
		{
		  listname: 'sidebar.authentication',
		  iconClass: 'fas fa-user',
		  child: [
			{
			  listname: 'sidebar.login',
			  routepath: '/login',
			  shortname: 'L'
			},
		  ]
		}
	  ]
	}
*/

export const HorizontalSidebarData = [
	{
		name: "sidebar.intro",
		routepath: "/Intro",
		iconClass: "fas fa-chalkboard",
	},
];

// ### For Horizontal sidebar

//     <!-- Basics -->
//         {
//             name: "sidebar.single",
//             iconClass: "fab fa-stripe-s",
//             routepath: "/single"
//         }
//     <!-- One Level -->
//         {
//             name: "sidebar.onelevel",
//             iconClass: "fas fa-expand",
//             child: [
//                 {
//                     name: "sidebar.example",
//                     routepath: "/ex",
//                 }
//             ]
//         }
//     <!-- Second level -->
//         {
//             name: "sidebar.secondlevel",
//             iconClass: "fas fa-expand",
//             child: [
//                 {
//                     name: "sidebar.example",
//                     iconClass: "fas fa-plus",
//                     child: [
//                         {
//                             name: "sidebar.example1",
//                             routepath: "/ex1",
//                         },
//                         {
//                             name: "sidebar.example2",
//                             routepath: "/ex2",
//                         }
//                     ]
//                 }
//             ]
//         }
