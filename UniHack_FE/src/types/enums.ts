export enum EnvType {
	Development = 'development',
	Playground = 'playground',
	Playground_2 = 'playground_2',
	Playground_3 = 'playground_3',
	Systest = 'systest',
	Preprod = 'preprod',
	Production = 'production'
}

export enum EventType {
	Resize = 'resize',
	Scroll = 'scroll',
	Click = 'click',
	MouseDown = 'mousedown',
	Initialized = 'initialized',
	Wheel = 'wheel',
	KeyUp = 'keyup',
	KeyDown = 'keydown',
	MouseMove = 'mousemove'
}

export enum ElementType {
	Title = 'title',
	Subtitle = 'subtitle',
	Text = 'text',
	Separator = 'separator',
	Input = 'input',
	Dropdown = 'dropdown',
	Radiobuttons = 'radiobuttons',
	Checkboxes = 'checkboxes',
	File = 'file'
}

export enum OrientationType {
	Horizontal = 'horizontal',
	Vertical = 'vertical'
}

export enum ChoiceType {
	SingleChoice = 'single_choice',
	MultipleChoice = 'multiple_choice'
}

export enum InputType {
	Text = 'text',
	Textarea = 'textarea',
	Email = 'email',
	Password = 'password',
	Date = 'date',
	DateTime = 'datetime',
	Number = 'number',
	Radio = 'radio',
	Checkbox = 'checkbox'
}

export enum AlertType {
	Notification = 'notification',
	Error = 'error'
}

export enum ImportType {
	Manual = 'manual',
	Now = 'now',
	Later = 'later',
	MoreDataToExistingEntries = 'more-data-to-existing-entries',
	MoreEntriesToDataset = 'more-entries-to-dataset',
	ReplaceAll = 'replace'
}

export enum PromOptionTypes {
	DefinePromForm = 'DefinePromForm',
	DistributionPushSetup = 'DistributionPushSetup',
	Later = 'later'
}

export enum PromDistributionTypes {
	Manual = 'manual',
	Automatic = 'automatic'
}

export enum FileType {
	Default = 'application/octet-stream',
	Csv = 'text/csv;charset=utf-8;'
}

export enum FileMimeType {
	JPG = 'image/jpeg',
	PNG = 'image/png',
	GIF = 'image/gif',
	BMP = 'image/bmp',
	TIFF = 'image/tiff',
	PDF = 'application/pdf',
	XLSX = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
	XLS = 'application/vnd.ms-excel',
	DOC = 'application/msword',
	DOCX = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
	ZIP = 'application/zip',
	XZIP = 'application/x-zip-compressed',
	CSV = 'text/csv',
	TXT = 'text/plain',
	OS = 'application/octet-stream'
}

export enum FileExtension {
	JPG = 'jpg',
	JPEG = 'jpeg',
	PNG = 'png',
	GIF = 'gif',
	BMP = 'bmp',
	TIFF = 'tiff',
	PDF = 'pdf',
	XLSX = 'xlsx',
	XLS = 'xls',
	DOC = 'doc',
	DOCX = 'docx',
	ZIP = 'zip',
	XZIP = 'xzip',
	CSV = 'csv',
	TXT = 'txt',
	OS = 'os'
}

export enum StorageKeys {
	LoginStep = 'storage-login-step',
	LoginCompleted = 'storage-login-completed',
	IdToken = 'storage-id-token',
	JADBioIdToken = 'storage-jadbio-id-token',
	PatientLoginCompleted = 'storage-patient-login-completed',
	Username = 'storage-username',
	IsUserAdmin = 'storage-is-user-admin',
	OneTimePassword = 'storage-one-time-password',
	UserLanguage = 'user-language',
	PrevPathname = 'previous-pathname',
	RefetchUserAddons = 'refetch-user-addons',
	SubscriptionUpdating = 'subscription-updating',
	// AUTOLOGOUT
	PageUnloadedTimestamp = 'page-unloaded-timestamp',
	InactivityTimestamp = 'inactivity-timestamp',
	UniqueTabIDs = 'tab-ids'
}

export enum DragAndDropTypes {
	Separator = '###',
	// FORM DESIGNER
	DroppableFormElement = 'droppableFormElement',
	DroppableFormVariable = 'droppableFormVariable',
	FormDroppableZone = 'formDroppableZone',
	FormDroppableZoneRow = 'formDroppableZoneRow',
	DraggableFormGroup = 'group-',
	DraggableFormSet = 'set-',
	// DEPENDENCIES
	DroppableDependenciesVarList = 'drop_dep_var_list',
	DraggableDependenciesVarList = 'drag_dep_var_list',
	// TEMPLATES
	DroppableTemplate = 'droppableTemplate',
	DraggableTemplateVarOrGroup = 'draggableTemplateVarOrGroup',
	DraggableTemplateVariable = 'draggableTemplateVariable',
	DraggableTemplateGroupedVariable = 'draggableTemplateGroupedVariable',
	DraggableTemplateGroup = 'draggableTemplateGroup',
	DroppableTemplateGroup = 'droppableTemplateGroup',
	TemplateDroppableZone = 'templateDroppableZone'
}

export enum TemplateViewTypes {
	Dropzone = 'dropzone',
	Description = 'description'
}

export enum TemplatePageViews {
	MyTemplates = 'mytemplates',
	OtherTemplates = 'otherTemplates'
}

export enum TemplatesOwnership {
	Public = 'public',
	SharedWithMe = 'sharedWithMe',
	SharedWithProject = 'sharedWithProject'
}

export enum TemplateShareLevel {
	ShareWithUsers = 'shareWithUsers',
	ShareWithProjects = 'shareWithProjects',
	ShareGlobally = 'shareGlobablly'
}

export enum DrawerChoices {
	profile = 'profile',
	accountInformation = 'accountInformation',
	workInformation = 'workInformation',
	personalSettings = 'personalSettings',
	security = 'security'
}

export enum FilterByTypeComponent {
	Patients = 'patients',
	Collaborators = 'collaborators',
	HelpPage = 'helpPage',
	AdminUsers = 'adminUsers',
	Documents = 'documents',
	Templates = 'templates',
	SubscriptionUsers = 'subscriptionUsers'
}

export enum ExportFileNames {
	// DATASET
	DatasetTable = 'dataset_table',
	// ANALYSIS
	FrequenciesTable = 'frequencies_table',
	FrequenciesColumns = 'frequencies_columns',
	FrequenciesPie = 'frequencies_pie',
	ExploreTable = 'explore_table',
	CompareNumericTable = 'compare_numeric_table',
	CrosstabTable = 'crosstab_table',
	CrosstabGroupedChart = 'crosstab_grouped_chart',
	CrosstabStackedChart = 'crosstab_stacked_chart',
	CrosstabSunburstChart = 'crosstab_sunburst_chart',
	KaplanMeierChart = 'kaplan_meier_chart',
	CorrelationsScatterChart = 'correlations_scatter_chart',
	PlotNumericColumnsChart = 'plot_numeric_columns_chart',
	PlotNumericBoxPlotChart = 'plot_numeric_box-plot_chart',
	PlotNumericScatterChart = 'plot_numeric_scatter_chart',
	DensityPlotChart = 'density_plot_chart',
	TimeCourseChart = 'time_course_chart',
	ComparePairedTable = 'compare_paired_table',

	// JADBio
	JADBioClassificationSummary = 'jadbio_classification_summary',
	JADBioClassificationPerformanceUMAP = 'jadbio_classification_performance_UMAP',
	JADBioClassificationPerformancePCA = 'jadbio_classification_performance_PCA',
	JADBioClassificationProbabilitiesDensityPlot = 'jadbio_classification_probabilities_density_plot',
	JADBioClassificationProbabilitiesBoxPlot = 'jadbio-classification_probabilities_box_plot',
	JADBioClassificationFeatureImportance = 'jadbio_classification_feature_importance',
	JADBioClassificationProgressiveFeatureImportance = 'jadbio_classification_progressive_feature_importance'
}

export enum LanguageType {
	English = 'EN',
	Norwegian = 'NB',
	Norwegian_Deprecated = 'NO'
}

export enum CreditCardBrands {
	Mastercard = 'Mastercard',
	Maestro = 'Maestro',
	Visa = 'Visa',
	VisaElectron = 'Visa Electron',
	Invalid = 'invalid'
}

export enum TableName {
	SubscriptionUsers = 'SubscriptionUsers',
	Billing = 'Billing',
	Collaborators = 'Collaborators',
	Statuses = 'Statuses',
	Documents = 'Documents',
	AdminUsers = 'AdminUsers',
	Entries = 'Entries'
}

export enum TableFilterType {
	Text = 'Text',
	Date = 'Date',
	Checkbox = 'Checkbox',
	Numeric = 'Numeric'
}

export enum SubscriptionAddonCode {
	JADBio = 'jadbio'
}

export enum DateLabels {
	Years = 'dateLabels.years',
	Months = 'dateLabels.months',
	Weeks = 'dateLabels.weeks',
	Days = 'dateLabels.days',
	Hours = 'dateLabels.hours',
	Minutes = 'dateLabels.minutes',
	Seconds = 'dateLabels.seconds'
}
