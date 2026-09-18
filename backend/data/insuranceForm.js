const insuranceForm = {
    formId: "auto-insurance-claim",

    name: "Auto Insurance Claim",

    description: "Dynamic form for filing an automobile insurance claim.",

    version: 2,

    status: "published",

    fields: [

      
        // INCIDENT INFORMATION
        

        {
            id: "incidentType",
            label: "What type of incident occurred?",
            type: "select",
            required: true,
            options: [
                {
                    label: "Vehicle Collision",
                    value: "vehicle_collision"
                },
                {
                    label: "Animal Collision",
                    value: "animal_collision"
                },
                {
                    label: "Hit and Run",
                    value: "hit_and_run"
                },
                {
                    label: "Theft",
                    value: "theft"
                },
                {
                    label: "Attempted Theft",
                    value: "attempted_theft"
                },
                {
                    label: "Vandalism",
                    value: "vandalism"
                },
                {
                    label: "Fire",
                    value: "fire"
                },
                {
                    label: "Flood / Water Damage",
                    value: "water_damage"
                },
                {
                    label: "Hail Damage",
                    value: "hail_damage"
                },
                {
                    label: "Storm / Wind Damage",
                    value: "storm_damage"
                },
                {
                    label: "Falling Object",
                    value: "falling_object"
                },
                {
                    label: "Glass / Windshield Damage",
                    value: "glass_damage"
                },
                {
                    label: "Road Hazard / Pothole",
                    value: "road_hazard"
                },
                {
                    label: "Vehicle Breakdown",
                    value: "vehicle_breakdown"
                },
                {
                    label: "Parking Lot Damage",
                    value: "parking_damage"
                },
                {
                    label: "Other",
                    value: "other"
                }
            ]
        },

        {
            id: "vehicle",
            label: "What vehicle was involved?",
            type: "text",
            required: true,
            placeholder: "e.g. Honda Civic"
        },

        {
            id: "vehicleRegistration",
            label: "What is the vehicle registration number?",
            type: "text",
            required: true,
            placeholder: "e.g. UP32AB1234"
        },

        {
            id: "incidentDate",
            label: "When did the incident occur?",
            type: "date",
            required: true
        },

        {
            id: "incidentTime",
            label: "Approximately what time did it happen?",
            type: "text",
            required: true,
            placeholder: "e.g. 7:30 PM"
        },

        {
            id: "incidentLocation",
            label: "Where did the incident occur?",
            type: "text",
            required: true,
            placeholder: "e.g. Hazratganj, Lucknow"
        },

        {
            id: "description",
            label: "Describe what happened",
            type: "textarea",
            required: true,
            placeholder: "Describe the incident in detail..."
        },

        // DAMAGE INFORMATION
   

        {
            id: "damage",
            label: "What was damaged?",
            type: "text",
            required: true,
            placeholder: "e.g. Windshield, bumper, door..."
        },

        {
            id: "damageSeverity",
            label: "How severe is the damage?",
            type: "select",
            required: true,
            options: [
                {
                    label: "Minor",
                    value: "minor"
                },
                {
                    label: "Moderate",
                    value: "moderate"
                },
                {
                    label: "Severe",
                    value: "severe"
                },
                {
                    label: "Vehicle may be a total loss",
                    value: "total_loss"
                },
                {
                    label: "Not sure",
                    value: "unknown"
                }
            ]
        },

        {
            id: "vehicleDrivable",
            label: "Is the vehicle still drivable?",
            type: "select",
            required: true,
            options: [
                {
                    label: "Yes",
                    value: "yes"
                },
                {
                    label: "No",
                    value: "no"
                },
                {
                    label: "Not sure",
                    value: "unknown"
                }
            ]
        },

        {
            id: "towingRequired",
            label: "Was towing required?",
            type: "select",
            required: true,
            options: [
                {
                    label: "Yes",
                    value: "yes"
                },
                {
                    label: "No",
                    value: "no"
                }
            ]
        },

        // OTHER VEHICLE
  

        {
            id: "anotherVehicle",
            label: "Was another vehicle involved?",
            type: "select",
            required: true,
            options: [
                {
                    label: "Yes",
                    value: "yes"
                },
                {
                    label: "No",
                    value: "no"
                }
            ]
        },

        {
            id: "otherVehicleNumber",
            label: "What is the other vehicle's registration number?",
            type: "text",
            required: true,
            placeholder: "Enter registration number...",
            showIf: {
                field: "anotherVehicle",
                value: "yes"
            }
        },

        {
            id: "otherVehicleMakeModel",
            label: "What is the other vehicle's make and model?",
            type: "text",
            required: true,
            placeholder: "e.g. Toyota Camry",
            showIf: {
                field: "anotherVehicle",
                value: "yes"
            }
        },

        {
            id: "otherDriverName",
            label: "What is the other driver's name?",
            type: "text",
            required: true,
            placeholder: "Enter the driver's name...",
            showIf: {
                field: "anotherVehicle",
                value: "yes"
            }
        },

        {
            id: "otherDriverPhone",
            label: "What is the other driver's phone number?",
            type: "text",
            required: true,
            placeholder: "Enter phone number...",
            showIf: {
                field: "anotherVehicle",
                value: "yes"
            }
        },

        {
            id: "otherInsurance",
            label: "What is the other driver's insurance company?",
            type: "text",
            required: true,
            placeholder: "e.g. State Farm, Geico...",
            showIf: {
                field: "anotherVehicle",
                value: "yes"
            }
        },

        // =========================
        // INJURY INFORMATION
        // =========================

        {
            id: "injuries",
            label: "Was anyone injured?",
            type: "select",
            required: true,
            options: [
                {
                    label: "Yes",
                    value: "yes"
                },
                {
                    label: "No",
                    value: "no"
                }
            ]
        },

        {
            id: "injuryDetails",
            label: "Please describe the injuries",
            type: "textarea",
            required: true,
            placeholder: "Describe the injuries...",
            showIf: {
                field: "injuries",
                value: "yes"
            }
        },

        {
            id: "medicalAttention",
            label: "Was medical attention required?",
            type: "select",
            required: true,
            options: [
                {
                    label: "Yes",
                    value: "yes"
                },
                {
                    label: "No",
                    value: "no"
                }
            ],
            showIf: {
                field: "injuries",
                value: "yes"
            }
        },

  
        // THEFT INFORMATION


        {
            id: "theftItems",
            label: "What was stolen?",
            type: "textarea",
            required: true,
            placeholder: "Describe the stolen vehicle or items...",
            showIf: {
                field: "incidentType",
                value: "theft"
            }
        },

        {
            id: "lastSeenLocation",
            label: "Where was the vehicle last seen?",
            type: "text",
            required: true,
            placeholder: "Enter location...",
            showIf: {
                field: "incidentType",
                value: "theft"
            }
        },

        {
            id: "keysAvailable",
            label: "Are the vehicle keys still in your possession?",
            type: "select",
            required: true,
            options: [
                {
                    label: "Yes",
                    value: "yes"
                },
                {
                    label: "No",
                    value: "no"
                }
            ],
            showIf: {
                field: "incidentType",
                value: "theft"
            }
        },

        // =========================
        // WEATHER INFORMATION
        // =========================

        {
            id: "weatherType",
            label: "What type of weather event caused the damage?",
            type: "select",
            required: true,
            options: [
                {
                    label: "Hail",
                    value: "hail"
                },
                {
                    label: "Heavy Rain",
                    value: "heavy_rain"
                },
                {
                    label: "Flood",
                    value: "flood"
                },
                {
                    label: "Strong Wind",
                    value: "wind"
                },
                {
                    label: "Storm",
                    value: "storm"
                },
                {
                    label: "Falling Tree",
                    value: "falling_tree"
                },
                {
                    label: "Other",
                    value: "other"
                }
            ],
            showIf: {
                field: "incidentType",
                value: "weather_damage"
            }
        },

        // =========================
        // FIRE INFORMATION
        // =========================

        {
            id: "fireCause",
            label: "What caused the fire?",
            type: "text",
            required: true,
            placeholder: "e.g. Engine failure, electrical issue...",
            showIf: {
                field: "incidentType",
                value: "fire"
            }
        },

        {
            id: "fireDamage",
            label: "How much of the vehicle was affected?",
            type: "select",
            required: true,
            options: [
                {
                    label: "Small area",
                    value: "small"
                },
                {
                    label: "Major portion",
                    value: "major"
                },
                {
                    label: "Entire vehicle",
                    value: "entire"
                },
                {
                    label: "Not sure",
                    value: "unknown"
                }
            ],
            showIf: {
                field: "incidentType",
                value: "fire"
            }
        },

      
        // POLICE / LEGAL
      

        {
            id: "policeReport",
            label: "Was a police report filed?",
            type: "select",
            required: true,
            options: [
                {
                    label: "Yes",
                    value: "yes"
                },
                {
                    label: "No",
                    value: "no"
                }
            ]
        },

        {
            id: "policeReportNumber",
            label: "What is the police report number?",
            type: "text",
            required: true,
            placeholder: "Enter report number...",
            showIf: {
                field: "policeReport",
                value: "yes"
            }
        },

    
        // WITNESSES
      

        {
            id: "witnesses",
            label: "Were there any witnesses?",
            type: "select",
            required: true,
            options: [
                {
                    label: "Yes",
                    value: "yes"
                },
                {
                    label: "No",
                    value: "no"
                }
            ]
        },

        {
            id: "witnessDetails",
            label: "Provide witness details",
            type: "textarea",
            required: true,
            placeholder: "Name and contact information...",
            showIf: {
                field: "witnesses",
                value: "yes"
            }
        },

        // EVIDENCE
      

        {
            id: "photosAvailable",
            label: "Do you have photos or videos of the incident or damage?",
            type: "select",
            required: true,
            options: [
                {
                    label: "Yes",
                    value: "yes"
                },
                {
                    label: "No",
                    value: "no"
                }
            ]
        },

        {
            id: "previousDamage",
            label: "Did the vehicle have any pre-existing damage?",
            type: "select",
            required: true,
            options: [
                {
                    label: "Yes",
                    value: "yes"
                },
                {
                    label: "No",
                    value: "no"
                },
                {
                    label: "Not sure",
                    value: "unknown"
                }
            ]
        },

        {
            id: "previousDamageDetails",
            label: "Describe the pre-existing damage",
            type: "textarea",
            required: true,
            placeholder: "Describe any previous damage...",
            showIf: {
                field: "previousDamage",
                value: "yes"
            }
        }
    ]
};

export default insuranceForm;

