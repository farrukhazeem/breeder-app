export const LOGIN_USER = 'login_user';
export const REGISTER_USER = 'register_breeder';
export const REMOVE_BREEDER = 'remove_breeder';
export const REGISTER_EMP = 'register_emp';
export const GET_ALL_EMP = 'get_all_emp';
export const RESEND_VERIFICATION_EMAIL = 'RESEND_VERIFICATION_EMAIL';
export const DELETE_USER_GALLERY_IMAGES = 'delete_user_gallery_image';
export const DELETE_DEAL_CATEGORIES = 'delete_deal_categories';
export const ADD_DEAL_CATEGORIES = 'add_deal_categories';
export const GET_ALL_USERS = 'GETALLUSERS';
export const ADMIN_DASHBOARD_STATICS = 'ADMIN_DASHBOARD_STATICS';

export const GET_USER_DETAIL_BY_ID = 'GET_USER_DETAIL_BY_ID';
export const BLOCK_BREEDER = 'BLOCK_BREEDER';
export const DELETE_BREEDER = 'DELETE_BREEDER';
export const ITEM_COUNT = 'ITEM_COUNT';


export const GET_ALL_BREEDER = 'get_all_breeder';

export const GET_BREEDER_EMPLOYEES = 'get_breeder_emp';
export const GET_EMP = 'get_emp';
export const UPDATE_EMP = 'update_emp';
export const REMOVE_EMP = 'remove_emp';
export const GET_BREEDER_TAX = 'get_breeder_tax';
export const POST_SETUPWIZARD = 'post_setupwizard';


export const AUTH_USER = 'auth_user';
export const LOGOUT_USER = 'logout_user';

export const CREATE_CARD_CUSTOMER = 'CREATE_CARD_CUSTOMER';

export const FORGET_PASSWORD = 'forget_password'
export const FORGET_PASSWORD_SUCCESS = 'forget_password_success';
export const FORGET_PASSWORD_FAILURE = 'forget_password_failure';
export const PASSWORD_CHANGE = 'password_change';
export const PASSWORD_CHANGE_EMP = 'password_change_emp';
export const USER_DETAIL = 'user_detail';
export const EDIT_USER_DETAIL = 'edit_detail';
export const GET_DASHBOARD_ANALYSIS = 'get_dashboard_analysis';


//------subscription package-------
//admin
export const CREATE_SUBSCRIPTION = 'create_subscription';
export const UPDATE_SUBSCRIPTION = 'update_subscription';
export const GET_SUBSCRIBED_PACKAGE = 'GET_SUBSCRIBED_PACKAGE';
export const DELETE_SUBSCRIPTION = 'delete_subscription';
export const DELETE_SUBSCRIPTIONS = 'delete_subscriptions';
export const GET_SUBSCRIPTIONS = 'get_subscriptions';
export const GET_SUBSCRIPTION = 'get_subscription';
//---
export const UPDATE_SUBSCRIBER = 'update_subscriber';
export const DELETE_SUBSCRIBERS = 'delete_subscribers';
export const GET_SUBSCRIBER = 'get_subscriber';
export const GET_SUBSCRIBERS = 'get_subscribers';
export const DELETE_SUBSCRIBER = 'delete_subscriber';
///

export const CREATE_SUBSCRIBER_STRIPE = 'create_subscriber_stripe';//breeder
export const CREATE_SUBSCRIBER_SIMPLE = 'create_subscriber_simple'


/// transaction --admin
export const GET_TRANSACTIONS = 'get_transactions';
export const GET_TRANSACTION = 'get_transaction';


///----animal----
//admin
export const GET_ALL_ANIMALS = 'get_all_animals';
export const DELETE_ALL_ANIMALS = 'delete_all_animals';
//
export const CREATE_ANIMAL = 'create_animal';
export const UPDATE_ANIMAL = 'update_animal';
export const DELETE_HEALTH_RECORD = 'delete_health_record';
export const ANIMAL_HEALTH_RECORD = 'ANIMAL_HEALTH_RECORD';

export const DELETE_ANIMAL = 'delete_animal';
export const GET_ANIMAL = 'get_animal';
export const DELETE_PARENT_DATA = 'delete_parent_data';
export const DELETE_CHILD_DATA = 'delete_child_data';

export const ADD_AS_PARENT_CHILD = 'add_as_parent_child';

export const GET_ANIMALS = 'get_animals';
export const TRANSFER_ANIMAL = "TRANSFER_ANIMAL";
export const FILTER_ANIMALS = 'filter_animals';
export const UPDATE_ANIMAL_DATA = 'update_animal_data';
export const GET_HEALTH_RECORD = 'get_health_record';
export const GET_QR_CODE_OF_ANIMAL = 'get_qr_code_of_animal';
export const DELETE_GALLERY_IMAGES = 'delete_gallery_images';

///breeder business profile
export const CREATE_BUSINESS = 'create_business';
export const UPDATE_BUSINESS = 'update_business';
export const GET_BUSINESS = 'get_business';
export const DELETE_BUSINESS = 'delete_business';

//location ,-------city,state,zipcode---------
export const CREATE_LOCATION = 'create_location';
export const UPDATE_LOCATION = 'update_location';
export const GET_LOCATION = 'get_location';
export const GET_LOCATIONS = 'get_locations';
export const GET_ALL_LOCATIONS = 'get_all_location';
export const DELETE_LOCATION = 'delete_location';

export const GET_CITIES = 'get_cities';
export const GET_STATES = 'get_states';
export const GET_ZIPCODES = 'get_zipcodes';

//--------categories------------
//admin
export const CREATE_CATEGORY = 'create_category';
export const UPDATE_CATEGORY = 'update_category';
export const DELETE_CATEGORY = 'delete_category';
export const UPDATE_CATEGORY_BY_ID = 'UPDATE_CATEGORY_BY_ID';
//
export const GET_CATEGORY = 'get_category';
export const GET_CATEGORIES = 'get_categories';
export const GET_CATEGORIES_BY_TYPE = 'get_categories_by_type';
export const ADD_CATEGORY_SUB_TYPE = 'add_categories_sub_type';

export const GET_CATEGORIES_INVENTORY_BY_BREEDER = 'get_categories_inventory_by_breeder';


//--------feed------------
export const CREATE_FEED = 'create_feed';
export const UPDATE_FEED = 'update_feed';
export const DELETE_FEED = 'delete_feed';
export const GET_FEED = 'get_feed';
export const GET_FEEDS = 'get_feeds';

export const CREATE_FEEDANIMAL = 'create_feedanimal';
export const UPDATE_FEEDANIMAL = 'update_feedanimal';
export const DELETE_FEEDANIMAL = 'delete_feedanimal';
export const GET_FEEDANIMAL = 'get_feedanimal';
export const GET_FEEDANIMALS = 'get_feedanimals';




//--------cleaning------------
export const CREATE_CLEANING = 'create_cleaning';
export const UPDATE_CLEANING = 'update_cleaning';
export const DELETE_CLEANING = 'delete_cleaning';
export const GET_CLEANING = 'get_cleaning';
export const GET_CLEANINGS = 'get_cleanings';

export const CREATE_CLEANINGANIMAL = 'create_cleaninganimal';
export const UPDATE_CLEANINGANIMAL = 'update_cleaninganimal';
export const DELETE_CLEANINGANIMAL = 'delete_cleaninganimal';
export const GET_CLEANINGANIMAL = 'get_cleaninganimal';
export const GET_CLEANINGANIMALS = 'get_cleaninganimals';


//--------vacination------------
export const CREATE_VACINATION = 'create_vacination';
export const UPDATE_VACINATION = 'update_vacination';
export const DELETE_VACINATION = 'delete_vacination';
export const GET_VACINATION = 'get_vacination';
export const GET_VACINATIONS = 'get_vacinations';

export const CREATE_VACINATIONANIMAL = 'create_vacinationanimal';
export const UPDATE_VACINATIONANIMAL = 'update_vacinationanimal';
export const DELETE_VACINATIONANIMAL = 'delete_vacinationanimal';
export const GET_VACINATIONANIMAL = 'get_vacinationanimal';
export const GET_VACINATIONANIMALS = 'get_vacinationanimals';


//---currency
export const CREATE_CURRENCY = 'create_currency';
export const UPDATE_CURRENCY = 'update_currency';
export const DELETE_CURRENCY = 'delete_currency';
export const GET_CURRENCY = 'get_currency';
export const GET_CURRENCIES = 'get_currencies';


//---units
export const CREATE_UNIT = 'create_unit';
export const UPDATE_UNIT = 'update_unit';
export const DELETE_UNIT = 'delete_unit';
export const GET_UNIT = 'get_unit';
export const GET_UNITS = 'get_units';


//---health
export const CREATE_HEALTH = 'create_health';
export const UPDATE_HEALTH = 'update_health';
export const DELETE_HEALTH = 'delete_health';
export const GET_HEALTH = 'get_health';
export const GET_HEALTHS = 'get_healths';//specific to breeders
export const DELETE_ALL_HEALTH = 'delete_all_health';//admin
export const GET_ALL_HEALTH = 'get_all_health';//admin


//---group
export const CREATE_GROUP = 'create_group';
export const UPDATE_GROUP = 'update_group';
export const DELETE_GROUP = 'delete_group';
export const GET_GROUP = 'get_group';
export const GET_GROUPS = 'get_groups';//specific to breeders

export const CREATE_GROUP_LOG = 'create_group_log';
export const UPDATE_GROUP_LOG = 'update_group_log';
export const DELETE_GROUP_LOG = 'delete_group_log';
export const GET_GROUP_LOG = 'get_group_log';
export const GET_GROUP_LOGS = 'get_group_logs';



//---notes
export const CREATE_NOTE = 'create_note';
export const UPDATE_NOTE = 'update_note';
export const DELETE_NOTE = 'delete_note';
export const GET_NOTE = 'get_note';
export const GET_NOTES = 'get_notes';//specific to breeders




// --- notifications
export const CREATE_NOTIFICATION = 'create_notific';
export const GET_NOTIFICATION = 'get_notific';
export const DELETE_NOTIFICATION = 'DELETE_NOTIFICATION';


// Sales 
export const ADD_SALE = 'add_sale';
export const GET_SALE = 'get_sale';
export const GET_SALE_BY_ID = 'get_sale_by_id';
export const CHANGE_PAID_STATUS = 'change_paid_status';
export const SALEGRAPHDATA = 'SALEGRAPHDATA';
export const DASHBOARDSALE = 'DASHBOARDSALE';
export const ALLSALEBYSELLER = 'ALLSALEBYSELLER';

export const GET_INVOICE_BY_SELLER_ID = 'get_invoice_by_sellerId';
export const GET_SALE_STATICS_BY_USER = 'getsale_static_by_user';
export const SOFTREMOVEINVOICE = 'soft_remove_invoice';
export const PAYINSTALLMENT = 'PAYINSTALLMENT';
export const INVOICE_REMINDER = 'INVOICE_REMINDER';


//---form and elements(admin)------
export const CREATE_ELEMENT = 'create_element';
export const UPDATE_ELEMENT = 'update_element';
export const DELETE_ELEMENT = 'delete_element';
export const GET_ELEMENT = 'get_element';
export const GET_ELEMENTS = 'get_elements';

export const CREATE_FORM = 'create_form';
export const UPDATE_FORM = 'update_form';
export const DELETE_FORM = 'delete_form';
export const GET_FORM = 'get_form';
export const ADD_FORM = 'ADD_FORM';
export const GET_FORM_BYBREEDER = 'get_form_byBreeder';
export const DELETE_FORM_ADMIN = 'DELETE_FORM_ADMIN';

export const MODIFY_FORM_STRUCTURE_VALUES = 'modifty_formstructure_values';
export const MODIFY_FORM_STRUCTURE_VALUES_GET = 'MODIFY_FORM_STRUCTURE_VALUES_GET';
export const MODIFY_FORM_STRUCTURE_VALUES_ADD = 'MODIFY_FORM_STRUCTURE_VALUES_ADD';
export const GET_FORMS = 'get_forms';
export const GET_FORM_BY_CATEGORY = 'get_form_by_category';
export const DELETE_FORM_REQUEST_FORMSTRUCTURE = 'DELETE_FORM_REQUEST_FORMSTRUCTURE';
export const DELETE_FORM_REQUEST = 'DELETE_FORM_REQUEST';

//Contacts
export const ADD_CONTACT = 'add_contact';
export const REMOVE_CONTACT = 'remove_contact';
export const SOFT_REMOVE_CONTACT = 'soft_remove_contact';
export const SOFT_REMOVE_CONTACT_BY_CATEGORY = 'soft_remove_contact_by_category';
export const EDIT_CONTACT = 'edit_contact';
export const GET_ALL_CONTACT = 'get_all_contact';
export const GET_CONTACT = 'get_contact';

//Contact Categories 
export const ADD_CONTACT_CATEGORY = 'add_contact_category';
export const GET_CONTACT_CATEGORIES = 'get_contact_categories';
export const GET_CONTACT_CATEGORY = 'get_contact_category';
export const DELETE_CONTACT_CATEGORY = 'delete_contact_category';
export const EDIT_CONTACT_CATEGORY = 'edit_contact_category';





//----Activities Management-----
//Activities
export const ADD_ACTIVITY = 'add_activity';
export const REMOVE_ACTIVITY = 'remove_activity';
export const EDIT_ACTIVITY = 'edit_activity';
export const GET_ALL_ACTIVITY = 'get_all_activity';
export const GET_ACTIVITY = 'get_activity';
export const GET_ALL_ACTIVITY_DATA = 'get_all_activity_data';


//Activities Categories
export const ADD_ACTIVITY_CATEGORY = 'add_activity_category';
export const GET_ACTIVITY_CATEGORIES = 'get_activity_categories';
export const GET_ACTIVITY_CATEGORY = 'get_activity_category';
export const DELETE_ACTIVITY_CATEGORY = 'delete_activity_category';
export const EDIT_ACTIVITY_CATEGORY = 'edit_activity_category';

//Activities Types
export const ADD_ACTIVITY_TYPE = 'add_activity_type';
export const GET_ACTIVITY_TYPES = 'get_activity_types';
export const GET_ACTIVITY_TYPE = 'get_activity_type';
export const DELETE_ACTIVITY_TYPE = 'delete_activity_type';
export const EDIT_ACTIVITY_TYPE = 'edit_activity_type';



//Product Types
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const GET_PRODUCT_BY_ID = 'GET_PRODUCT_BY_ID';
export const EDIT_PRODUCT = 'EDIT_PRODUCT';
export const GET_PRODUCT = 'get_product';
export const GET_PRODUCT_BY_ID_SHARE = 'GET_PRODUCT_BY_ID_SHARE';


// PACKAGE
export const ADD_PACKAGE = 'add_package';


//--------feedback------------
export const CREATE_FEEDBACK = 'CREATE_FEEDBACK';
export const DELETE_FEEDBACK = 'DELETE_FEEDBACK';
export const GET_FEEDBACKS = 'GET_FEEDBACKS';
export const GET_FEEDBACK = 'GET_FEEDBACK';