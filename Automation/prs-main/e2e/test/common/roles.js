const Roles = {
    ROLE_NUS_ADMIN: "NUS Administrator",
    ROLE_FAC_ADMIN: "Faculty Administrator",
    ROLE_DEPT_ADMIN: "Department Administrator",
    ROLE_DEAN: "Dean",
    ROLE_HEAD_OF_DEPARTMENT: "Head of Department",
    ROLE_REGULATORY: "Regulatory Officer",
    ROLE_QUOTATION_APPV_AUTH: "Quotation Approving Authority",
    ROLE_GOODS_RECEIPT: "Goods Receipt Officer",
    ROLE_PRINCIPAL_INVESTIGATOR: "Principal Investigator",
    ROLE_RESEARCHER: "Researcher",
    ROLE_LAB_ADMIN: "Laboratory Administrator",
    ROLE_LABORATORY_SUPPLY: "Laboratory Supply Officer",
    ROLE_VICE_PRESIDENT: "Vice President",
    ROLE_CATALOGUE_ADMIN: "Catalogue Administrator",
    ROLE_VIEWER: "Viewer"
}

const AdministratorRoles = [
    'ROLE_NUS_ADMIN',
    'ROLE_FAC_ADMIN',
    'ROLE_DEPT_ADMIN',
    'ROLE_CATALOGUE_ADMIN'
];

const PurchaseRoles = [
    'ROLE_PRINCIPAL_INVESTIGATOR',
    'ROLE_RESEARCHER',
    'ROLE_LAB_ADMIN'
];

const ApproverRoles = [
    'ROLE_DEAN',
    'ROLE_HEAD_OF_DEPARTMENT',
    'ROLE_REGULATORY',
    'ROLE_QUOTATION_APPV_AUTH',
    'ROLE_PRINCIPAL_INVESTIGATOR',
    'ROLE_VICE_PRESIDENT'
];

const RequestViewerRoles = [
    'ROLE_NUS_ADMIN',
    'ROLE_FAC_ADMIN',
    'ROLE_DEPT_ADMIN',
    'ROLE_CATALOGUE_ADMIN',
    'ROLE_VIEWER'
];

module.exports = {
    Roles: Roles,
    AdministratorRoles: AdministratorRoles,
    PurchaseRoles: PurchaseRoles,
    ApproverRoles: ApproverRoles,
    RequestViewerRoles: RequestViewerRoles
}