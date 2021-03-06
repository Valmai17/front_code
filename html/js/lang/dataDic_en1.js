define(function (require) {
  return {
    org: {
      eqxvp2h7ii: {
        id: "eqxvp2h7ii",
        pId: "eitlmcx1pl",
        compName: "Initial company",
        csn: "Initial company",
        t: "1",
        disable: "0",
        code: "dyr5v67w",
      },
      eqxw3e98ma: {
        id: "eqxw3e98ma",
        pId: "eqxvp2h7ii",
        compName: "Initial company",
        csn: "Initial company",
        deptName: "Initial Department",
        t: "2",
        disable: "0",
        code: "dyr5v67g",
      },
      eitlmcx1pl: {
        id: "eitlmcx1pl",
        compName: "赛为集团",
        csn: "赛为集团",
        t: "1",
        disable: "0",
        code: "dyr5v67s",
      },
    },
    isUse: [{ 0: "not used" }, { 1: "used" }],
    specialty: [
      { 1: "technology" },
      { 2: "mechanical equipment" },
      { 3: "compressor" },
      { 4: "instrument automation" },
      { 5: "measurement" },
      { 6: "electrical" },
      { 7: "communication" },
      { 8: "pipe" },
      { 9: "emergency" },
      { 10: "other" },
    ],
    introducer: [
      { 0: "parameter monitoring" },
      { 1: "equipment and facilities" },
      { 2: "post operation" },
      { 3: "space and region" },
      { 4: "buried facilities" },
      { 5: "line maintenance" },
      { 6: "traffic safety" },
      { 7: "living logistics" },
      { 8: "construction work" },
    ],
    iegn_user_export_task_status: [
      { 1: "in progress" },
      { 2: "finished" },
      { 3: "failure" },
    ],
    sub_introducer: [
      { 0: "process equipment" },
      { 1: "self control" },
      { 2: "electrical corrosion protection" },
      { 3: "safe" },
      { 4: "compressor" },
      { 5: "communication" },
      { 6: "compressor unit" },
      { 7: "pathway area" },
      { 8: "work task" },
      { 9: "parameter control" },
      { 10: "vehicle parts" },
      { 11: "driving environment" },
      { 12: "violations" },
      { 13: "facilities" },
      { 14: "living and office area" },
      { 15: "operation" },
      { 16: "personnel activities" },
      { 17: "off load station" },
      { 18: "line maintenance" },
    ],
    iam_casualty_affiliation: [{ 1: "administration staff" }, { 2: "contractor staff" }],
    risk_hse_evalu_method: [{ 1: "LEC" }],
    shareType: [{ 1006: "text" }, { 1007: "picture" }, { 1008: "video" }],
    checkResult: [{ 0: "unqualified" }, { 1: "qualified" }],
    itm_cert_status: [{ 1: "valid" }, { 2: "invalid" }],
    course_language: [{ 0: "Chinese" }, { 1: "English" }, { 2: "other" }],
    hier_of_ctrl_meas: [
      { 1: "elimination" },
      { 2: "lower" },
      { 3: "isolation" },
      { 4: "reduce exposure" },
      { 5: "program" },
      { 6: "PPE" },
    ],
    ira_risk_judgm_status: [{ 0: "to be executed" }, { 1: "ended" }],
    iptw_commitment_type: [
      { 6: "job cancellation statement" },
      { 7: "job completion statement" },
      { 8: "work Guardian commitment" },
      { 9: "before construction - gas detection conclusion" },
      { 10: "Safety Educator commitment" },
    ],
    checkTable_type: [{ 0: "unscheduled check" }, { 1: "scheduled check" }, { 2: "general" }],
    itm_cert_retrial_result: [{ 1: "passed" }, { 2: "failed" }],
    iem_emer_resource_rescue_supply_category: [
      { 1: "investigation" },
      { 2: "alert" },
      { 3: "fire fighting" },
      { 4: "communication" },
      { 5: "lifesaving" },
      { 6: "demolition" },
      { 7: "plugging" },
      { 8: "transfer" },
      { 9: "decontamination" },
      { 10: "smoke exhaust" },
      { 11: "lighting" },
      { 12: "other" },
    ],
    icm_admin_lic_process_operate: [
      { 1: "enterprise initial application" },
      { 2: "enterprise change application" },
      { 3: "enterprise renewal application" },
      { 4: "government review" },
      { 5: "government approval" },
      { 6: "enterprise revision" },
      { 10: "other" },
    ],
    icm_admin_lic_cert: [
      { 1: "Permit / license" },
      { 2: "qualification certificate / qualification certificate" },
      { 3: "approval documents / supporting documents" },
      { 10: "other administrative license" },
    ],
    courseware_type: [
      { 1: "video" },
      { 2: "audio" },
      { 3: "picture" },
      { 4: "WORD" },
      { 5: "EXCEL" },
      { 6: "PPT" },
      { 7: "PDF" },
    ],
    isr_is_complete: [{ 1: "not done" }, { 2: "done" }],
    train_task_result: [
      { 0: "in training" },
      { 6: "in training (overdue)" },
      { 1: "failed" },
      { 2: "pass" },
      { 7: "pass (overdue)" },
      { 3: "waiting for retraining" },
      { 4: "cancelled" },
      { 5: "not started" },
    ],
    training_requirement: [
      { 1: "R1 understanding" },
      { 2: "R2 Mastery" },
      { 3: "R3 - Master and guide others" },
      { 4: "R4 qualification certificate" },
    ],
    iptw_catalog_commitment_type: [
      { 1: "assignment applicant (commitment)" },
      { 2: "person in charge of operation (commitment)" },
      { 3: "Operation Supervisor (commitment)" },
      { 4: "operation countersigner (person in charge of production unit on site) (commitment)" },
      { 5: "operation countersigner (person in charge of competent department) (commitment)" },
      { 6: "operation countersigner (person in charge of safety department) (commitment)" },
      { 7: "responsible person of related parties (commitment)" },
      { 8: "license approved by (commitment)" },
      { 9: "job complete (Declaration)" },
      { 10: "job cancellation (Declaration)" },
      { 11: "before construction - gas detection (conclusion)" },
      { 12: "Safety Educator (commitment)" },
    ],
    iptw_cert: [{ 0: "certificate 1" }, { 1: "certificate 2" }],
    teacher_type: [{ 0: "internal lecturer" }, { 1: "external lecturer" }],
    train_task_type: [
      { 1: "matrix task (Compulsory)" },
      { 2: "temporary task (Compulsory)" },
      { 3: "optional task (optional)" },
    ],
    type_of_app_scenarios: [
      { 0: "job activity" },
      { 1: "equipment and facilities" },
      { 2: "workplace" },
    ],
    iam_investigation_job_class: [
      { 1: "exploration" },
      { 2: "drilling" },
      { 3: "Engineering" },
      { 4: "other" },
    ],
    course_level: [{ 1: "understanding" }, { 2: "Mastery" }, { 3: "Mastery" }],
    iri_check_result_is_default: [{ 0: "no" }, { 1: "yes" }],
    iem_exercise_scheme_status: [
      { 0: "unpublished" },
      { 1: "published" },
      { 2: "implemented" },
      { 3: "done" },
    ],
    icm_project_three_simult_task_task_nature: [
      { 1: "inside the company" },
      { 2: "entrusted outsourcing" },
    ],
    plan_frequence: [
      { 0: "execute once" },
      { 1: "heaven" },
      { 2: "week" },
      { 3: "month" },
      { 4: "quarter" },
      { 6: "year" },
      { 5: "custom" },
    ],
    plan_specialty: [
      { 2: "self control" },
      { 1: "equipment process" },
      { 3: "communication" },
      { 4: "compressor" },
      { 5: "safety and environmental protection" },
      { 6: "production operation" },
      { 7: "financial assets" },
      { 8: "synthesis" },
      { 9: "political work" },
      { 10: "electrical" },
      { 11: "line" },
      { 12: "anticorrosion" },
    ],
    qualification_level: [{ 0: "first level qualification" }, { 1: "second level qualification" }],
    check_task_close_reason: [
      { 1: "monthly and weekly inspection has included the current inspection task" },
      { 2: "bad weather, etc." },
    ],
    pool_first_level: [
      { 1: "oil and gas station depot" },
      { 2: "safety management" },
      { 3: "pipeline route" },
      { 4: "engineering construction" },
      { 5: "life logistics" },
    ],
    random_observe_operation_type: [
      { 1: "hidden trouble - on site rectification" },
      { 2: "potential problems - reporting territory" },
      { 3: "behavior event sharing" },
    ],
    system_element: [
      { 0: "leadership and commitment" },
      { 1: "focus on customers, employees, society and related parties" },
      { 2: "HSE policy" },
      { 3: "planning" },
      { 4: "organizational structure, responsibilities, resources and documents" },
      { 5: "product implementation and operation" },
      { 6: "inspection and corrective action" },
      { 7: "management review" },
    ],
    iptw_result_type: [{ 1: "job complete" }, { 2: "job cancel" }, { 3: "job renew" }],
    course_frequency: [
      { 0: "no need to recuperate" },
      { 2: "2.0 years" },
      { 3: "3.0 years" },
      { 4: "4.0 years" },
      { 5: "5.0 years" },
      { 1: "1.0 years" },
    ],
    sex: [{ 0: "female" }, { 1: "male" }],
    regulation_file_type: [
      { 1: "management manual" },
      { 2: "management program" },
      { 3: "operation rules" },
      { 4: "operation instruction" },
      { 5: "other" },
    ],
    iptw_isolation_type: [
      { 1: "process isolation" },
      { 2: "mechanical isolation" },
      { 3: "electrical isolation" },
      { 4: "System Shield" },
    ],
    check_status: [
      { 0: "unexpired" },
      { 1: "to be executed" },
      { 2: "on schedule" },
      { 3: "overdue execution" },
      { 4: "not implemented" },
      { 5: "invalid" },
    ],
    dicType: [{ 0: "data dictionary" }, { 1: "system parameters" }, { 2: "resource configuration" }],
    emergency_plan: [{ 0: "no" }, { 1: "yes" }],
    pool_verify_status: [{ 100: "qualified" }, { 2: "unqualified" }],
    pool_sourceType: [
      { 0: "manual registration" },
      { 1: "inspection record" },
      { 2: "random observation" },
      { 4: "inspection record" },
      { 5: "temporary work record" },
      { 6: "risk assessment" },
    ],
    ira_check_principle_frequency: [{ 1: "day" }, { 2: "week" }, { 3: "month" }],
    question_use_type: [{ 1: "test questions" }, { 2: "practice questions" }],
    cascade_rel_setting: [
      { digital_type1: "℃" },
      { digital_type2: "μm" },
      { digital_type3: "mm/s" },
      { digital_type4: "m/s2" },
    ],
    iem_exercise_plan_form: [
      { 1: "desktop deduction" },
      { 2: "field exercise" },
      { 3: "self made" },
    ],
    isShared: [{ 0: "not shared" }, { 1: "shared" }],
    stateData: [{ 0: "in use" }, { 1: "out of service" }, { 2: "out of service" }],
    icm_project_three_simult_task_examine_nature: [
      { 1: "license" },
      { 2: "Filing" },
    ],
    icm_project_three_simult_task_type: [
      { 1: "occupational disease prevention" },
      { 2: "security protection" },
      { 3: "fire protection" },
      { 4: "environmental protection" },
    ],
    hazardous_elements_senior: [{ 1: "behavior" }, { 2: "state" }],
    paper_create_type: [
      { 0: "manual test paper generation" },
      { 1: "random test paper generation" },
      { 2: "strategy test paper generation" },
    ],
    iem_emer_resource_status: [
      { 0: "in use" },
      { 1: "stop" },
      { 2: "inspection and repair" },
      { 3: "scrap / invalidation" },
    ],
    document_data_type: [
      { 1: "public documents" },
      { 2: "audited" },
      { 10: "to be reviewed" },
      { 11: "rejected" },
    ],
    pool_problem_reason: [
      { 1: "no one is responsible" },
      { 2: "no corresponding standards and regulations" },
      { 3: "not able to do or master specific standards and requirements" },
      { 4: "missing or not done in place" },
      { 5: "no conditions to do" },
      { 6: "I know what to do and how much to do, but I don't want to do it" },
      { 7: "the territorial supervisor did not check or did not check out" },
      { 8: "other causes (Legacy problems, design and manufacturing problems, etc., should be detailed)" },
    ],
    risk_supervise_evalu_method: [{ 20: "checklist method" }],
    hidden_danger_type: [{ 1: "field management" }, { 2: "basic management" }],
    node_type: [{ 0: "contents" }, { 1: "chapters" }],
    isr_position_inventory_frequencyType: [
      { 1: "heaven" },
      { 2: "month" },
      { 3: "ten days" },
      { 4: "quarter" },
      { 5: "half a year" },
      { 6: "year" },
    ],
    task_illegal_status: [
      { 2: "check time is less than the shortest check time" },
      { 3: "the inspection time is greater than the longest inspection time" },
      { 4: "check path GPS offset record abnormality" },
      { 5: "check that the path GPS offset is less than the minimum GPS offset" },
      { 6: "overdue but not inspected" },
      { 7: "insufficient check item record" },
    ],
    hazardous_elements_junior: [
      { 1: "safe" },
      { 2: "occupational health" },
      { 3: "environment" },
      { 4: "property damage" },
    ],
    ira_check_principle_frequency_type: [
      { 10: "daily routine" },
      { 11: "day synthesis" },
      { 20: "week routine" },
      { 21: "week synthesis" },
      { 30: "month routine" },
      { 31: "month synthesis" },
    ],
    pool_high_risk: [
      { 301: "key equipment and facilities parameters overrun" },
      { 302: "key risk control in risk operation is not in place" },
      { 303: "safety interlock protection failure" },
      { 304: "critical equipment failure" },
      { 305: "lack of safety precautions" },
      { 306: "major hidden danger not eliminated in time" },
      { 307: "violation of prohibition" },
      { 308: "important alarms of key equipment and facilities are not handled in time" },
    ],
    iem_emer_resource_type: [
      { 1: "workplace equipment" },
      { 2: "personal protective equipment" },
      { 3: "rescue vehicle allocation" },
      { 4: "rescue materials allocation" },
    ],
    risk_biz_source_type: [
      { 1: "HSE risk" },
      { 2: "integrity assessment risk" },
      { 3: "supervision, inspection and evaluation risk" },
    ],
    management_role: [{ 0: "position" }, { 1: "role" }],
    regulation_manage_element: [
      { 1: "objective responsibility" },
      { 2: "institutionalized management" },
      { 3: "education and training" },
      { 4: "site management" },
      { 5: "safety risk control and hidden danger investigation and treatment" },
      { 6: "emergency management" },
      { 7: "accident management" },
      { 8: "continuous improvement" },
      { 9: "other" },
    ],
    tool_type: [{ 0: "to do" }, { 1: "done" }],
    type_of_ctrl_meas: [{ 1: "preventive measures" }, { 2: "remedial measures" }],
    is_downloadable: [{ 0: "not allowed" }, { 1: "allowed" }],
    icm_project_three_simultaneous_nature: [
      { 1: "new project" },
      { 2: "expansion project" },
      { 3: "reconstruction project" },
      { 4: "relocation project" },
      { 5: "recovery project" },
      { 6: "technical transformation" },
      { 7: "technology introduction" },
    ],
    random_observe_hse_type: [{ 1: "safety" }, { 2: "environmental protection" }, { 3: "occupational health" }],
    task_disable: [{ 0: "published" }, { 1: "deleted" }],
    checkSource: [{ 1: "web entry" }, { 0: "mobile phone check" }],
    pool_approval_status: [
      { 200: "no rectification required" },
      { 11: "rectification needed" },
      { 3: "unable to rectify" },
    ],
    random_observe_audit_result: [{ 1: "pass" }, { 2: "veto" }],
    check_obj_risk_type: [
      { 1: "homework activity" },
      { 2: "equipment and facilities" },
      { 3: "item material" },
      { 4: "compliance with law" },
      { 5: "work environment" },
      { 6: "general" },
    ],
    digital_type: [
      { 1: "temperature (℃)" },
      { 2: "vibration displacement (μ m)" },
      { 3: "vibration velocity (mm / s)" },
      { 4: "vibration acceleration (m / s2)" },
    ],
    table_business_type: [{ isp_simple: "Regular inspection" }, { isp_route: "On-Site Inspection" }],
    emer_exercise_subjects_type: [
      { 1: "exercise subject type 1" },
      { 2: "exercise subject type 2" },
    ],
    ira_risk_judgm_operation_type: [
      { 101: "unplanned maintenance work" },
      { 102: "unconventional work performed by contractor" },
      { 103: "work deviating from safety standards, rules and procedures" },
      { 104: "cross operation" },
      { 105: "work without safety procedures" },
      { 106: "shielding and interruption alarm, interlocking and safety emergency equipment" },
      { 107: "for other work that is not sure whether to apply for work permit" },
      { 108: "work in confined space" },
      { 201: "excavation operation" },
      { 202: "hot work" },
      { 203: "higher than job" },
      { 204: "mobile crane lifting operation" },
      { 109: "pipeline open job" },
      { 301: "temporary electricity operation" },
      { 110: "specific implementation of vehicle entry permit" },
      { 111: "the specific implementation of the permission to take photos and take photos on site" },
    ],
    prevention_person: [
      { 1: "safety supervision" },
      { 2: "safety officer" },
      { 3: "operator" },
      { 4: "vehicle manager" },
      { 5: "Chef" },
      { 6: "electrical engineer" },
      { 7: "electrical technician" },
      { 8: "person in charge" },
      { 9: "head of department" },
      { 10: "equipment engineer" },
      { 11: "equipment technician" },
      { 12: "territorial inspector" },
      { 13: "driver" },
      { 14: "communication engineer" },
      { 15: "communication technician" },
      { 16: "maintenance worker" },
      { 17: "general engineer of maintenance station" },
      { 18: "compressor engineer" },
      { 19: "Yin Bao engineer" },
      { 20: "operation tester" },
      { 21: "stationmaster" },
      { 22: "on duty" },
      { 23: "deputy director in charge" },
      { 24: "automatic control engineer" },
      { 25: "automatic control technician" },
      { 26: "operation monitoring" },
      { 27: "operation command" },
    ],
    icpe_check_table_result: [
      { 1: "qualified" },
      { 0: "unqualified" },
      { 2: "not involved" },
      { 3: "None" },
    ],
    look_up: [{ 1: "system parameters" }, { 2: "resource configuration" }],
    equipment_state: [{ 0: "in use" }, { 1: "out of service" }, { 2: "out of service" }],
    postType: [{ 0: "normal role" }, { 1: "HSE role" }],
    check_frequency: [
      { 1: "real time" },
      { 2: "before each job / operation" },
      { 3: "every 4 hours" },
      { 4: "once a day" },
      { 5: "twice a day" },
      { 6: "once a week" },
      { 7: "more than three times a week" },
      { 8: "every two weeks" },
      { 9: "every half month in winter" },
      { 10: "once a month" },
      { 11: "Quarterly" },
      { 12: "before the rainy season" },
      { 13: "before winter" },
      { 14: "every six months" },
      { 15: "once a year" },
      { 16: "every two years" },
      { 17: "every three years" },
      { 18: "irregular" },
    ],
    routing_inspection_check_obj_type: [
      { 0: "general Patrol" },
      { 1: "major hazard inspection" },
    ],
    pool_low_old_bad_level: [{ 1: "low standard" }, { 2: "old problem" }, { 3: "bad habit" }],
    isRectification: [{ 0: "no" }, { 1: "yes" }],
    itm_cert_is_recheck_required: [{ 1: "need" }, { 0: "don't need" }],
    iem_maint_record_type: [{ 1: "repair and repair" }, { 2: "maintenance" }],
    pool_reformType: [{ 0: "immediate rectification" }, { 1: "normal rectification" }],
    risk_state: [{ 0: "evaluated" }, { 1: "not evaluated" }, { 2: "not passed" }],
    reformer_flag: [{ 0: "no" }, { 1: "yes" }],
    data_type: [{ 1: "random observation hidden danger" }, { 3: "random observation sharing" }],
    randomObservation_status: [
      { 0: "to be submitted" },
      { 1: "pending approval" },
      { 4: "shared" },
      { 2: "hidden danger transferred" },
      { 3: "rejected" },
    ],
    is_qualified_remark_write: [{ 0: "no" }, { 1: "yes" }],
    iem_emer_plan_status: [
      { 1: "programming" },
      { 2: "internal review" },
      { 3: "external review" },
      { 4: "corporate approval" },
      { 5: "government filing" },
      { 6: "release implementation" },
      { 10: "published" },
    ],
    train_task_status: [
      { 4: "untrained" },
      { 5: "planned" },
      { 0: "in progress" },
      { 1: "failed" },
      { 2: "pass" },
      { 3: "waiting for retraining" },
    ],
    modeler_type: [{ 0: "unpublished" }, { 1: "published" }],
    check_type: [{ 0: "execute once" }, { 1: "execute multiple" }],
    course_disable: [{ 0: "on the shelf" }, { 1: "off the shelf" }],
    is_rater_required: [{ 0: "no" }, { 1: "yes" }],
    isa_audit_item_type: [
      { 1: "type item" },
      { 5: "bonus item" },
      { 10: "minus item" },
      { 15: "veto" },
    ],
    exam_result: [{ 0: "未通过" }, { 1: "通过" }],
    hazard: [
      { 1: "sports machinery" },
      { 2: "moving, falling, flying objects" },
      { 3: "falling from height" },
      { 4: "slide, trip, fall" },
      { 5: "drowning, suffocating" },
      { 6: "fire" },
      { 7: "pressure" },
      { 8: "explosion" },
      { 9: "electrical hazard" },
      { 10: "manual operation" },
      { 11: "driving" },
      { 12: "excavation" },
      { 13: "chemicals" },
      { 14: "noise" },
      { 15: "radiation" },
      { 16: "lighting" },
      { 17: "vibration" },
      { 18: "extreme temperature" },
      { 19: "biological" },
      { 20: "food hygiene" },
      { 21: "device with display" },
      { 22: "ergonomics / equipment design" },
      { 24: "air quality" },
      { 25: "raw material consumption" },
      { 26: "atmospheric emissions" },
      { 27: "water discharge" },
      { 28: "generation, management and disposal of hazardous waste" },
      { 29: "generation, management and disposal of non hazardous substances" },
      { 30: "emissions to land" },
      { 31: "discharge to groundwater" },
      { 32: "impact on animals and plants" },
      { 33: "visual pollution" },
      { 34: "light pollution" },
      { 35: "other" },
      { 23: "stress related" },
    ],
    icm_admin_lic_type: [
      { 1: "normal" },
      { 2: "concession" },
      { 3: "recognition" },
      { 4: "approved" },
      { 5: "registration" },
      { 10: "other" },
    ],
    asmt_task_status: [
      { 0: "to start" },
      { 1: "to be evaluated" },
      { 2: "to be reviewed" },
      { 3: "to be modified" },
      { 4: "done" },
      { 5: "self assessment expired" },
      { 6: "cancelled" },
      { 7: "invalid" },
    ],
    jse_op_card_speciality_type: [
      { 1: "technology" },
      { 2: "mechanical equipment" },
      { 3: "compressor" },
      { 4: "instrument automation" },
      { 5: "measurement" },
      { 6: "electrical" },
      { 7: "communication" },
      { 8: "pipe" },
      { 9: "emergency" },
    ],
    service_qualification: [
      { 0: "main engine maintenance qualification" },
      { 1: "auxiliary equipment maintenance qualification" },
      { 2: "supervisor" },
      { 3: "debug" },
    ],
    profession: [
      { 0: "equipment process" },
      { 1: "self control" },
      { 2: "communication" },
      { 3: "compressor" },
      { 4: "safety and environmental protection" },
      { 5: "production operation" },
      { 6: "financial assets" },
      { 7: "synthesis" },
      { 8: "political work" },
      { 9: "electrical" },
      { 10: "line" },
      { 11: "anticorrosion" },
    ],
    icm_project_three_simultaneous_phase: [
      { 1: "feasibility study" },
      { 2: "project approval" },
      { 3: "preliminary design" },
      { 4: "detailed design" },
      { 5: "construction" },
      { 6: "trial production" },
    ],
    type_of_check_object: [
      { 1: "work environment" },
      { 2: "homework activity" },
      { 3: "device type" },
      { 4: "device individual" },
      { 5: "major hazard source" },
      { 6: "key hazardous chemical process" },
      { 7: "key hazardous chemicals" },
      { 8: "general hazardous chemicals" },
      { 12: "material" },
    ],
    iam_is_investigated: [{ 0: "not generated" }, { 1: "generated" }],
    train_plan_status: [{ 0: "unpublished" }, { 1: "published" }, { 2: "canceled" }],
    iptw_work_status: [
      { 2: "to be reviewed" },
      { 3: "pending application" },
      { 4: "to be checked" },
      { 5: "to be countersigned" },
      { 6: "pending approval" },
      { 7: "in operation" },
      { 8: "to be closed" },
      { 9: "cancelled" },
      { 10: "done" },
      { 11: "vetoed" },
      { 12: "aborted" },
    ],
    isr_control_rank: [
      { 1: "team level" },
      { 2: "section level" },
      { 3: "workshop level" },
      { 4: "factory level" },
      { 5: "company level" },
    ],
    standard_limitation: [{ 1: "current" }, { 2: "repeal" }, { 3: "to be implemented" }],
    exam_Published: [{ 0: "published" }, { 1: "unpublished" }, { 2: "canceled" }],
    iri_check_result_is_right: [{ 0: "error" }, { 1: "correct" }],
    asmt_task_auditSource: [{ 0: "system due submission" }, { 1: "user manual submission" }],
    pool_reform_status: [
      { 0: "other" },
      { 1: "rectification within the time limit" },
      { 2: "overdue rectification" },
      { 3: "no rectification within the time limit" },
    ],
    icm_limitation: [
      { 1: "currently valid" },
      { 2: "modified" },
      { 3: "waiting for implementation" },
      { 4: "repeal" },
    ],
    checkLevel: [{ 0: "group inspection" }, { 1: "company inspection" }, { 2: "grassroots unit inspection" }],
    risk_markup: [{ 0: "hidden danger to risk" }, { 1: "self built record" }],
    regulation_file_level: [
      { 1: "confidential" },
      { 2: "internal disclosure" },
      { 3: "external disclosure" },
      { 4: "other" },
    ],
    regulation_manage_scope: [
      { 1: "occupational health (H)" },
      { 2: "safety production (s)" },
      { 3: "social security (s)" },
      { 4: "environmental protection (E)" },
      { 5: "social responsibility (SP)" },
      { 6: "other" },
    ],
    iptw_sign_type: [{ 1: "operation applicant" }, { 2: "operation approval person" }],
    pool_type: [{ 0: "behavior class" }, { 1: "state class" }, { 2: "management class" }],
    question_type: [{ 1: "single choice question" }, { 2: "multiple choice question" }, { 3: "judgment question" }],
    icm_admin_punish_type: [
      { 1: "warning" },
      { 2: "fine" },
      { 3: "confiscation of illegal income or illegal property" },
      { 4: "order to suspend production and business" },
      { 5: "suspend or revoke license" },
      { 6: "suspension or revocation of license" },
    ],
    isPublished: [
      { 0: "unpublished" },
      { 1: "published" },
      { 2: "invalid" },
      { 3: "finished" },
    ],
    approval_stage: [
      { 0: "stationmaster approval" },
      { 1: "regional manager approval" },
      { 2: "approval by superior leaders" },
    ],
    paper_type: [{ 1: "after class test" }, { 2: "simulation paper" }, { 3: "examination paper" }],
    disable: [{ 0: "enable" }, { 1: "disable" }],
    iem_emer_plan_type: [
      { 1: "comprehensive emergency plan" },
      { 2: "special emergency plan" },
      { 3: "on site disposal plan" },
    ],
    iptw_operation_type: [
      { 1: "assignment appointment" },
      { 2: "job audit" },
      { 3: "apply for work order" },
      { 4: "energy isolation" },
      { 5: "gas detection (before operation)" },
      { 6: "implementation of measures" },
      { 7: "assignment countersignature" },
      { 8: "operation approval" },
      { 9: "safety education" },
      { 10: "gas detection (in operation)" },
      { 11: "operation monitoring" },
      { 12: "site confirmation" },
      { 13: "energy isolation removed" },
      { 14: "operation closing signature confirmation" },
      { 15: "job closed" },
    ],
    iem_emer_resource_rescue_vehicle_category: [
      { 1: "fire fighting and rescue vehicle" },
      { 2: "raise the rescue vehicle" },
      { 3: "special rescue vehicle" },
      { 4: "logistics rescue vehicle" },
    ],
    icm_project_three_simult_task_phase: [
      { 1: "feasibility study" },
      { 2: "project approval" },
      { 3: "preliminary design" },
      { 4: "detailed design" },
      { 5: "construction" },
      { 6: "trial production" },
    ],
    task_group_status: [
      { 0: "unexpired" },
      { 1: "to be executed" },
      { 2: "unfinished" },
      { 3: "done" },
      { 4: "not implemented" },
      { 5: "invalid" },
    ],
    operation_type: [
      { INSERT: "newly added" },
      { DELETE: "delete" },
      { UPDATE: "modify" },
      { SELECT: "query" },
    ],
    login_type: [{ 0: "web page" }, { 1: "mobile Android" }, { 2: "mobile IOS" }],
    exam_schedule_status: [
      { 0: "to start" },
      { 1: "started" },
      { 2: "finished" },
      { 3: "submitted" },
      { 4: "absent from the exam" },
      { 5: "cancelled" },
    ],
    pool_biz_source_type: [{ 1: "external inspection hidden danger" }, { 2: "special inspection hidden danger" }],
    info_source: [
      { 11: "behavior safety observation" },
      { 0: "leading safety activities" },
      { 1: "station level self inspection" },
      { 2: "internal audit (department level)" },
      { 3: "internal audit (company level)" },
      { 4: "internal audit and inspection (professional company)" },
      { 5: "internal audit and inspection (group company)" },
      { 6: "external audit" },
      { 7: "risk identification and evaluation" },
      { 8: "behavior safety observation" },
      { 9: "accident event" },
      { 10: "emergency drill" },
    ],
    icm_project_three_simult_task_detail_operate: [
      { 1: "internal review" },
      { 2: "external review" },
      { 3: "application review" },
    ],
    special_type: [
      { 1001: "major hazard source" },
      { 1002: "key chemicals" },
      { 1003: "key chemical process" },
    ],
    com_audit_status: [{ 0: "to be submitted" }, { 1: "under review" }, { 2: "approved" }],
    ira_biz_item_type: [
      { 1: "check item" },
      { 2: "equipment maintenance item" },
      { 3: "hidden danger record" },
    ],
    is_inside: [{ 1: "internal" }, { 2: "external" }],
    level_of_control: [{ 1: "company" }, { 2: "workshop" }, { 3: "team" }],
    pool_low_risk: [{ 101: "record problem" }, { 102: "flag identification problem" }],
    workflow_type: [{ 1: "hidden danger" }, { 2: "review" }],
    regulation_limitation: [
      { 1: "currently valid" },
      { 2: "modified" },
      { 3: "waiting for implementation" },
      { 4: "repeal" },
    ],
    sexsa: [{ 1: "male" }, { 0: "female" }],
    iam_investigation_accident_type: [
      { 1: "death" },
      { 2: "injury caused by work delay" },
      { 3: "job restriction or transfer" },
      { 4: "recordable accident" },
      { 5: "simple medical treatment" },
      { 6: "fire" },
      { 7: "property damage" },
      { 8: "oil spill" },
      { 9: "gas leakage" },
      { 10: "near miss" },
      { 11: "other" },
    ],
    isr_time_plan: [{ 1: "annual commitment" }, { 2: "half year commitment" }, { 3: "quarterly commitment" }],
    risk_level_result: [{ 10: "low risk" }, { 20: "medium risk" }, { 30: "high risk" }],
    ira_check_principle_type: [{ 1: "general" }, { 2: "comprehensive" }],
    pool_status: [
      { 0: "to be submitted" },
      { 1: "pending approval" },
      { 11: "to be assigned" },
      { 2: "to be rectified" },
      { 3: "to be verified" },
      { 100: "verification qualified" },
      { 200: "does not exist" },
      { 201: "offline coordination" },
    ],
    infoSourceOfStatistics: [],
    class_status: [
      { 1: "signing up" },
      { 2: "registration ended" },
      { 3: "in training" },
      { 4: "end of training" },
      { 5: "end" },
    ],
    remindType: [{ 0: "time reminder" }, { 1: "event reminder" }, { 2: "approval reminder" }],
    plan_type: [{ 1: "work plan" }, { 2: "inspection plan" }],
    icm_admin_lic_status: [
      { 1: "initial application" },
      { 2: "change request" },
      { 3: "renewal application" },
      { 4: "review" },
      { 5: "reply" },
      { 6: "revision" },
      { 7: "abandoned" },
      { 10: "other" },
    ],
    standard_effective_level: [
      { 1: "mandatory international standard" },
      { 2: "recommended international standard" },
      { 3: "mandatory national standard" },
      { 4: "recommended national standard" },
      { 5: "mandatory industry standard" },
      { 6: "recommended industry standard" },
      { 7: "mandatory local standards" },
      { 8: "recommended local standard" },
      { 9: "other foreign standards" },
      { 10: "other domestic standards" },
    ],
    iptw_audit_result: [{ 1: "failed" }, { 2: "passed" }],
    iptw_work_type: [{ 0: "type 1" }, { 1: "type 2" }],
    risk_level_result_color: [
      { 10: "#4472c4" },
      { 20: "#ffc12a" },
      { 30: "#ff1e02" },
    ],
    residual_risk_evaluation_rank: [{ 1: "high" }, { 2: "medium" }, { 3: "low" }],
    pool_second_level: [
      { 1: "sub standard of equipment and facilities" },
      { 2: "the implementation of document standards is not in place" },
      { 3: "lack of management" },
      { 4: "design defects" },
      { 5: "unsafe behavior of personnel" },
      { 6: "fire management issues" },
      { 7: "hazardous chemicals management" },
      { 8: "dangerous operation management" },
      { 9: "emergency management" },
      { 10: "visual management" },
      { 11: "risk management" },
      { 12: "pipeline security" },
      { 13: "Yin Bao management" },
    ],
    professionOfStatistics: [],
    risk_integrity_evalu_method: [
      { 10: "RBI" },
      { 11: "RCM" },
      { 12: "SIL" },
      { 13: "HAZOP" },
      { 14: "QRA" },
    ],
    course_type: [{ 1: "self study" }, { 2: "face to face" }, { 3: "practical operation" }],
    process_type: [
      { 0: "behavior hidden danger" },
      { 1: "state hidden danger" },
      { 2: "management hidden danger" },
    ],
    comp_type: [{ 0: "state owned enterprise" }, { 1: "collective enterprise" }, { 2: "private enterprise" }],
    prevention_department: [
      { 1: "safety supervision station" },
      { 2: "off load station" },
      { 3: "pipeline Department" },
      { 4: "production department" },
      { 5: "maintenance station" },
      { 6: "compressor station" },
      { 7: "valve chamber" },
      { 8: "office" },
      { 9: "Jizhu station" },
      { 10: "gas transmission department" },
      { 11: "site unit" },
      { 12: "site management unit" },
    ],
    pool_medium_risk: [
      { 201: "parameter overrun of non critical equipment and facilities" },
      { 202: "general risk control in risk operation is not in place" },
      { 203: "the test report has not received effective attention" },
      { 204: "non critical equipment and facilities defects" },
      { 205: "important alarms of non critical equipment and facilities are not handled in time" },
      { 206: "pipeline important identification missing" },
      { 207: "lightning and static protection problem" },
      { 208: "general hidden danger not eliminated in time" },
      { 209: "Contractor's hazardous work" },
      { 210: "testing and inspection not carried out as required" },
    ],
    risk_type: [
      { 重大事故隐患: "Hidden danger of major accidents" },
      { 一般事故隐患: "General accident hidden danger" },
    ],
    icm_effective_level: [
      { 1: "International Convention" },
      { 2: "constitution" },
      { 3: "law" },
      { 4: "administrative regulations" },
      { 5: "department rules of the State Council" },
      { 6: "local regulations" },
      { 7: "local department regulations" },
      { 8: "industry regulations" },
      { 9: "group rules" },
      { 10: "judicial interpretation" },
    ],
    start_up: [{ 0: "on the job" }, { 1: "leaving" }],
    icm_admin_punish_status: [
      { 1: "normal" },
      { 2: "objection" },
      { 3: "undo" },
      { 10: "other" },
    ],
    isr_responsibility_type: [{ 1: "position" }, { 2: "department" }],
    iem_exercise_scheme_form: [{ 1: "desktop exercise" }, { 2: "field exercise" }],
    service_type: [{ 0: "labor export" }, { 1: "project contractor" }],
    mail_status: [{ 0: "failure" }, { 1: "success" }],
    todo_type: [
      { 1: "pending approval" },
      { 2: "to be rectified" },
      { 3: "to be verified" },
      { 11: "to be assigned" },
      { 5: "to be checked" },
    ],
    iem_exercise_plan_status: [
      { 0: "unpublished" },
      { 1: "published" },
      { 2: "invalid" },
    ],
  };
});
