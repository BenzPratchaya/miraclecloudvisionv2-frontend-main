export class SiteInformation {
    constructor(OrgName: string, OrgId: number) {
      this.OrgName = OrgName;
      this.OrgId = OrgId;
    }
  
    public OrgId: number;
    public OrgName: string;
    public OrgAlias!: string;
    public OrgAddr1!: string;
    public OrgWebsite!: string;
  
    public EmpUid!: string;
    public UserName!: string;
    public SecurityQuestion!: string;
    public SecurityAnswer!: string;
    public Pwd!: string;
    public UnitId!: number;
    public JobtitleId!: number;
    public JobType!: string;
    public IsRadiologist!: string;
    public Salutation!: string;
    public Fname!: string;
    public Mname!: string;
    public Lname!: string;
    public TitleEng!: string;
    public FnameEng!: string;
    public MnameEng!: string;
    public LnameEng!: string;
    public Gender!: string;
    public EmailPersonal!: string;
    public EmailOfficial!: string;
    public PhoneHome!: string;
    public PhoneMobile!: string;
    public PhoneOffice!: string;
    public PreferredPhone!: string;
    public PabxExt!: number;
    public FaxNo!: string;
    public Dob!: Date;
    public BloodGroup!: string;
    public DefaultLang!: number;
    public Religion!: number;
    public PeAddr1!: string;
    public PeAddr2!: string;
    public PeAddr3!: string;
    public PeAddr4!: string;
    public AuthLevelId!: number;
    public ReportingTo!: number;
    public AllowOthersToFinalize!: string;
    public LastPwdModified!: Date;
    public LastLogin!: Date;
    public CardNo!: string;
    public PlaceOfBirth!: string;
    public Nationality!: string;
    public MStatus!: string;
    public IsActive!: string;
    public SupportUser!: string;
    public CanKillSession!: string;
    public DefaultShiftNo!: number;
    public ImgFileName!: string;
    public EmpReportFooter1!: string;
    public EmpReportFooter2!: string;
    public Visible!: boolean;
  
    public OrgEmail1!: string;
    public OrgTel1!: string;
    public IsApproved!: boolean;
    public OrgPrefix!: string;
    public OrgSuffix!: string;
    public ApprovedOn!: Date;
    public CreatedOn!: Date;
    public PacsUrl1!: string;
    public PacsUrl2!: string;
    public PacsEndpoint!: string;
    public BufferQueue!: number;
    public WarningQueue!: number;
    public BusQueue!: number;
    public BatchMwl!: boolean;
    public AutoSendToPacs!: boolean;
  
    public RepFooter1!: string;
    public DCMViewer!: string;
    public OrgType!: string;
    public OrgParentId?: number;
    public AddendumPosition!: string;
    public LineId!: string;
  }
  