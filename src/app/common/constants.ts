export class Constants {
  //commom
  public static ADMIN_API_ACCESS_TYPE : string = '2';
  public static DEF_ALERT_MSG_TIMEOUT : number = 7000;
  public static STATUS_ACTIVE : number = 1;
  public static STATUS_INACTIVE : number = 0;
  public static VERSION_ADD : number = 1;
  public static VERSION_EDIT : number = 2;
  public static STATUS_ACTIVE_LABEL : string = 'Active';
  public static STATUS_INACTIVE_LABEL : string = 'Inactive';
  //default status constants
  public static DEF_STATUS : any[] = [
    {id:'0', name:'INACTIVE'},
    {id:'1', name:'ACTIVE'}
  ];

  //nav
  public static NAV_BRANDS : string = "brands";
  public static NAV_CUSTOMERS : string = "customers";
  public static NAV_DASHBOARD : string = "dashboard";
  public static NAV_WIDGETS : string = "widgets";
  public static NAV_REPORTS : string = "reports";
  public static NAV_CONFIG : string = "config";
  public static NAV_PRODUCTS : string = "products";
  public static NAV_PLANS : string = "plans";
  public static NAV_DISCOUNTS : string = "discounts";
  public static NAV_PROMO : string = "promo";
  public static NAV_EMAILS : string = "emails";
  public static NAV_MANAGE_ADMIN : string = "manageadmin";
  public static NAV_CURRENCY : string = "currency";
  public static NAV_PERIODS : string = "periods";
  public static NAV_CANCEL_REASON : string = "cancelreason";
  public static NAV_CONT_CAT : string = "contcat";
  public static NAV_CONT_TYPE : string = "conttype";
  public static NAV_MET_ACT_TYPE : string = "acttype";
  public static NAV_USER_ROLE : string = "userroles";
  public static NAV_PAYMENT_TYPE : string = "paymenttype";
  
  //Brands constants
  public static VIEW_BRAND_FAILURE_MSG : string = 'Failed to load the brand details. Please try again later.';
  public static UPDATE_BRAND_BRAND_EXISTS_MSG : string = 'Brand name already exists.';
  public static UPDATE_BRAND_DOMAIN_EXISTS_MSG : string = 'Domain name already exists.';
  public static UPDATE_BRAND_FAILURE_MSG : string = 'Failed to update brand. Please try again later.';
  public static ADD_BRAND_FAILURE_MSG : string = 'Failed to create new brand. Please try again later.';
  public static UPDATE_BRAND_SUCCESS_MSG : string = 'Brand details updated successfully.';
  public static ADD_BRAND_SUCCESS_MSG : string = 'New brand has been created successfully.';
  public static DEL_BRAND_FAILURE_MSG : string = 'Failed to Update Brand Status. Please try again later.';
  public static DEL_BRAND_SUCCESS_MSG : string = 'Brand status has been updated successfully.';

  //Customer constants
  public static CUSTOMER_TYPE_REGULAR_USER : number = 1;
  public static CUSTOMER_TYPE_FREE_USER : number = 2;
  public static CUSTOMER_TYPE_CORP_USER : number = 3;
  public static CUSTOMER_TYPE_STUDENT_USER : number = 4;
  public static VIEW_CUSTOMER_FAILURE_MSG : string = 'Failed to load the customer details. Please try again later.';
  public static UPDATE_CUSTOMER_EXISTS_MSG : string = 'Customer Email already exists.';
  public static UPDATE_CUSTOMER_NO_CHANGE_MSG : string = 'No changes has been made.';
  public static UPDATE_CUSTOMER_FAILURE_MSG : string = 'Failed to update customer details. Please try again later.';
  public static ADD_CUSTOMER_FAILURE_MSG : string = 'Failed to register new customer profile. Please try again later.';
  public static UPDATE_CUSTOMER_SUCCESS_MSG : string = 'Customer details updated successfully.';
  public static ADD_CUSTOMER_SUCCESS_MSG : string = 'New customer profile has been created successfully.';
  public static DEL_CUSTOMER_FAILURE_MSG : string = 'Failed to Update Customer Status. Please try again later.';
  public static DEL_CUSTOMER_SUCCESS_MSG : string = 'Customer status has been updated successfully.';

  //order status constants
  public static ORDER_STATUS : any[] = [
    {id:'0', name:'CANCELLED'},
    {id:'1', name:'ACTIVE'}
  ];
  //transaction status constants
  public static TRANSACTION_STATUS : any[] = [
    {id:'1', name:'Succeeded'},
    {id:'2', name:'Failed'},
    {id:'3', name:'Pending'},
    {id:'4', name:'Active_Pending'}
  ];
  //purchase status constants
  public static PURCHASE_STATUS : any[] = [
    {id:'1', name:'AUTO_RENEWED'}
  ];
  //cancel reason type constants
  public static CANCEL_REASON_TYPE : any[] = [
    {id:'1', name:'Public'},
    {id:'2', name:'Private'}
  ];

  // Promo code constants
  public static VIEW_PROMOS_FAILURE_MSG : string = 'Failed to load the promo code details. Please try again later.';
  public static UPDATE_PROMOS_EXISTS_MSG : string = 'Promo code already exists.';
  public static UPDATE_PROMOS_FAILURE_MSG : string = 'Failed to update brand. Please try again later.';
  public static UPDATE_PROMOS_SUCCESS_MSG : string = 'Promo code details updated successfully.';
  public static ADD_PROMOS_FAILURE_MSG : string = 'Failed to create new brand. Please try again later.';
  public static ADD_PROMOS_SUCCESS_MSG : string = 'New promo code has been created successfully.';
  public static DEL_PROMOS_SUCCESS_MSG : string = 'Promo code status has been updated successfully.';
  public static DEL_PROMOS_FAILURE_MSG : string = 'Failed to Update Promo code Status. Please try again later.';
  public static DEL_PROMOS_FAILURE_ALREADY_MAPPED_MSG : string = 'Failed to Update Promo code Status. Promo code is mapped with Discount Id/Ids';

  // Products constants
  public static VIEW_PRODUCT_FAILURE_MSG : string = 'Failed to load the product details. Please try again later.';
  public static UPDATE_PRODUCT_EXISTS_MSG : string = 'Product already exists.';
  public static UPDATE_PRODUCT_FAILURE_MSG : string = 'Failed to update product. Please try again later.';
  public static UPDATE_PRODUCT_SUCCESS_MSG : string = 'Product details updated successfully.';
  public static ADD_PRODUCT_FAILURE_MSG : string = 'Failed to create new product. Please try again later.';
  public static ADD_PRODUCT_SUCCESS_MSG : string = 'New product has been created successfully.';
  public static DEL_PRODUCT_SUCCESS_MSG : string = 'Product status has been updated successfully.';
  public static DEL_PRODUCT_FAILURE_MSG : string = 'Failed to Update Product Status. Please try again later.';

  // Discount constants
  public static VIEW_DISCOUNT_FAILURE_MSG : string = 'Failed to load the discount details. Please try again later.';
  public static UPDATE_DISCOUNT_EXISTS_MSG : string = 'Discount name already exists.';
  public static UPDATE_DISCOUNT_FAILURE_MSG : string = 'Failed to update discount. Please try again later.';
  public static UPDATE_DISCOUNT_SUCCESS_MSG : string = 'Discount details updated successfully.';
  public static ADD_DISCOUNT_FAILURE_MSG : string = 'Failed to create new discount. Please try again later.';
  public static ADD_DISCOUNT_SUCCESS_MSG : string = 'New discount has been created successfully.';
  public static DEL_DISCOUNT_SUCCESS_MSG : string = 'Discount status has been updated successfully.';
  public static DEL_DISCOUNT_FAILURE_MSG : string = 'Failed to Update Discount Status. Please try again later.';
  public static DEL_DISCOUNT_FAILURE_ALREADY_MAPPED_MSG : string = 'Failed to Update Discount Status. Discount is mapped with Plan Id/Ids';

  // Plan constants
  public static VIEW_PLAN_FAILURE_MSG : string = 'Failed to load the plan details. Please try again later.';
  public static UPDATE_PLAN_EXISTS_MSG : string = 'Plan name already exists.';
  public static UPDATE_PLAN_FAILURE_MSG : string = 'Failed to update plan. Please try again later.';
  public static UPDATE_PLAN_SUCCESS_MSG : string = 'Plan details updated successfully.';
  public static ADD_PLAN_FAILURE_MSG : string = 'Failed to create new plan. Please try again later.';
  public static ADD_PLAN_SUCCESS_MSG : string = 'New plan has been created successfully.';
  public static DEL_PLAN_SUCCESS_MSG : string = 'Plan status has been updated successfully.';
  public static DEL_PLAN_FAILURE_MSG : string = 'Failed to Update Plan Status. Please try again later.';
  public static DEL_PLAN_FAILURE_ALREADY_MAPPED_MSG : string = 'Failed to Update Plan Status. Plan is mapped with Product Id/Ids';

  //Settings Manage Admin constants
  public static VIEW_ADMIN_FAILURE_MSG : string = 'Failed to load the admin details. Please try again later.';
  public static UPDATE_ADMIN_EXISTS_MSG : string = 'Admin email already exists.';
  public static UPDATE_ADMIN_FAILURE_MSG : string = 'Failed to update admin details. Please try again later.';
  public static ADD_ADMIN_FAILURE_MSG : string = 'Failed to add new admin user. Please try again later.';
  public static UPDATE_ADMIN_SUCCESS_MSG : string = 'Admin details updated successfully.';
  public static ADD_ADMIN_SUCCESS_MSG : string = 'New admin user has been added successfully.';
  public static DEL_ADMIN_FAILURE_MSG : string = 'Failed to Update Admin User Status. Please try again later.';
  public static DEL_ADMIN_SUCCESS_MSG : string = 'Admin user status has been updated successfully.';
  public static UPDATE_ADMIN_PWD_SUCCESS_MSG : string = 'Admin user password has been updated successfully.';
  public static UPDATE_ADMIN_PWD_FAILURE_MSG : string = 'Failed to update admin user password. Please try again later.';
  public static UPDATE_ADMIN_PWD_INCORRECT : string = 'Old password is incorrect.';
  public static UPDATE_ADMIN_PWD_USER_NOT_FOUND : string = 'User profile not found.';
  public static UPDATE_ADMIN_PWD_NO_CHANGES : string = 'No changes have been made to the password.';
  public static UPDATE_ADMIN_PWD_SAME : string = 'Both old and new password are same.';

  public static ADMIN_ROLES : any[] = [
    {id:'1', name:'Super Admin'},
    {id:'2', name:'Company Admin'}
  ];
  public static ADMIN_ROLE_SUPER_ADMIN : number = 1;
  public static ADMIN_ROLE_COMPANY_ADMIN : number = 2;

  //Widgets constants
  public static WIDGET_TYPE_DATA : any[] = [
      {id:'1', name:'Paywall'},
      {id:'2', name:'Notifier'}
  ];
  public static WIDGET_TYPE_PAYWALL : number = 1;
  public static WIDGET_ACTION_TYPE_CUSTOM_COUNT : number = 5;
  public static ADD_WIDGET_SUCCESS_MSG : string = 'New widget has been created successfully.';
  public static ADD_WIDGET_FAILURE_MSG : string = 'Failed to create new widget. Please try again later.';
  public static DEL_WIDGET_FAILURE_MSG : string = 'Failed to Update Widget Status. Please try again later.';
  public static DEL_WIDGET_SUCCESS_MSG : string = 'Widget status has been updated successfully.';
  public static UPDATE_WIDGET_FAILURE_MSG : string = 'Failed to update widget. Please try again later.';
  public static UPDATE_WIDGET_SUCCESS_MSG : string = 'Widget details updated successfully.';
  public static UPDATE_WIDGET_RULE_EXISTS_MSG : string = 'Rule already exists. Please try new rule or update the existing rule.';
  public static VIEW_WIDGET_FAILURE_MSG : string = 'Failed to load the widget details. Please try again later.';

  public static ADD_EMAIL_TMPLT_SUCCESS_MSG : string = 'New email template has been created successfully.';
  public static ADD_EMAIL_TMPLT_FAILURE_MSG : string = 'Failed to create new email template. Please try again later.';
  public static DEL_EMAIL_TMPLT_FAILURE_MSG : string = 'Failed to Update Email Template Status. Please try again later.';
  public static DEL_EMAIL_TMPLT_SUCCESS_MSG : string = 'Email Template status has been updated successfully.';
  public static UPDATE_EMAIL_TMPLT_FAILURE_MSG : string = 'Failed to update email template. Please try again later.';
  public static UPDATE_EMAIL_TMPLT_SUCCESS_MSG : string = 'Email template details updated successfully.';
  public static UPDATE_EMAIL_TMPLT_RULE_EXISTS_MSG : string = 'Rule already exists. Please try new rule or update the existing rule.';
  public static VIEW_EMAIL_TMPLT_FAILURE_MSG : string = 'Failed to load the email template details. Please try again later.';
}