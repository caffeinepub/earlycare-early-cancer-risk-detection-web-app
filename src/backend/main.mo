import Map "mo:core/Map";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  include MixinStorage();

  type Gender = { #male; #female; #other };

  public type UserProfile = {
    name : Text;
    email : ?Text;
  };

  public type TestSubmission = {
    name : Text;
    age : Nat;
    gender : Gender;
    smoking : Bool;
    alcohol : Bool;
    pain : Bool;
    lump : Bool;
    weightLoss : Bool;
    image : ?Storage.ExternalBlob;
  };

  public type RiskLevel = {
    #high;
    #medium;
    #low;
  };

  public type TestResult = {
    submission : TestSubmission;
    riskLevel : RiskLevel;
    advice : Text;
    timestamp : Time.Time;
  };

  public type HealthTip = {
    title : Text;
    description : Text;
    icon : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();
  let testResults = Map.empty<Principal, TestResult>();
  let healthTips = Map.empty<Nat, HealthTip>();
  var healthTipCounter : Nat = 0;

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Admin check
  public query ({ caller }) func isAdmin() : async Bool {
    AccessControl.isAdmin(accessControlState, caller);
  };

  // Test Submission and Results
  public shared ({ caller }) func submitTest(submission : TestSubmission) : async TestResult {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can submit tests");
    };

    let riskLevel = calculateRisk(submission);

    let result : TestResult = {
      submission;
      riskLevel;
      advice = getAdvice(riskLevel);
      timestamp = Time.now();
    };

    testResults.add(caller, result);

    result;
  };

  public query ({ caller }) func getMyResults() : async ?TestResult {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view saved results");
    };
    testResults.get(caller);
  };

  // Health Tips - Public access for viewing
  public query func getAllHealthTips() : async [HealthTip] {
    // No authorization needed - public health information accessible to all including guests
    healthTips.values().toArray();
  };

  public shared ({ caller }) func addHealthTip(tip : HealthTip) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add health tips");
    };
    healthTips.add(healthTipCounter, tip);
    healthTipCounter += 1;
  };

  // Utility function - public access
  public query func getRiskLevelText(level : RiskLevel) : async Text {
    // No authorization needed - utility function accessible to all
    switch (level) {
      case (#high) { "High" };
      case (#medium) { "Medium" };
      case (#low) { "Low" };
    };
  };

  // Private helper functions
  func calculateRisk(submission : TestSubmission) : RiskLevel {
    var score = 0;

    if (submission.smoking) { score += 2 };
    if (submission.alcohol) { score += 1 };
    if (submission.pain) { score += 2 };
    if (submission.lump) { score += 3 };
    if (submission.weightLoss) { score += 2 };
    if (submission.age > 50) { score += 1 };

    if (score >= 7) { #high } else if (score >= 4) { #medium } else { #low };
  };

  func getAdvice(level : RiskLevel) : Text {
    switch (level) {
      case (#high) {
        "Your risk is high. Please consult a doctor immediately and consider lifestyle changes.";
      };
      case (#medium) {
        "Your risk is moderate. Monitor your health closely and consider preventive measures.";
      };
      case (#low) {
        "Your risk is low. Maintain a healthy lifestyle and have regular checkups.";
      };
    };
  };
};
