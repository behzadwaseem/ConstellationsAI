const Skeleton = {
    nodes: [
      {
        id: "nose",
        label: "nose",
        position: {
          x: 114.50567626953125,
          y: 93.2281494140625
        }
      },
      {
        id: "left_eye",
        label: "left_eye",
        position: {
          x: 147,
          y: 76
        }
      },
      {
        id: "right_eye",
        label: "right_eye",
        position: {
          x: 92,
          y: 73
        }
      },
      {
        id: "left_ear",
        label: "left_ear",
        position: {
          x: 170,
          y: 88
        }
      },
      {
        id: "right_ear",
        label: "right_ear",
        position: {
          x: 68,
          y: 76
        }
      },
      {
        id: "left_shoulder",
        label: "left_shoulder",
        position: {
          x: 115,
          y: 158
        }
      },
      {
        id: "right_shoulder",
        label: "right_shoulder",
        position: {
          x: 96,
          y: 147
        }
      },
      {
        id: "left_elbow",
        label: "left_elbow",
        position: {
          x: 150,
          y: 178
        }
      },
      {
        id: "right_elbow",
        label: "right_elbow",
        position: {
          x: 72,
          y: 162
        }
      },
      {
        id: "left_wrist",
        label: "left_wrist",
        position: {
          x: 182,
          y: 209
        }
      },
      {
        id: "right_wrist",
        label: "right_wrist",
        position: {
          x: 49,
          y: 186
        }
      },
      {
        id: "left_hip",
        label: "left_hip",
        position: {
          x: 111,
          y: 303
        }
      },
      {
        id: "right_hip",
        label: "right_hip",
        position: {
          x: 100,
          y: 303
        }
      },
      {
        id: "left_knee",
        label: "left_knee",
        position: {
          x: 127,
          y: 334
        }
      },
      {
        id: "right_knee",
        label: "right_knee",
        position: {
          x: 88,
          y: 334
        }
      },
      {
        id: "left_ankle",
        label: "left_ankle",
        position: {
          x: 143,
          y: 373
        }
      },
      {
        id: "right_ankle",
        label: "right_ankle",
        position: {
          x: 80,
          y: 369
        }
      }
    ],
    edges: [
      {
        from: "right_shoulder",
        to: "right_elbow"
      },
      {
        from: "right_elbow",
        to: "right_wrist"
      },
      {
        from: "right_shoulder",
        to: "right_hip"
      },
      {
        from: "right_hip",
        to: "right_knee"
      },
      {
        from: "right_knee",
        to: "right_ankle"
      },
      {
        from: "left_shoulder",
        to: "left_elbow"
      },
      {
        from: "left_elbow",
        to: "left_wrist"
      },
      {
        from: "left_shoulder",
        to: "left_hip"
      },
      {
        from: "left_hip",
        to: "left_knee"
      },
      {
        from: "left_knee",
        to: "left_ankle"
      },
      {
        from: "left_shoulder",
        to: "right_shoulder"
      },
      {
        from: "left_hip",
        to: "right_hip"
      },
      {
        from: "nose",
        to: "left_eye"
      },
      {
        from: "nose",
        to: "right_eye"
      },
      {
        from: "nose",
        to: "left_ear"
      },
      {
        from: "nose",
        to: "right_ear"
      },
      {
        from: "nose",
        to: "left_shoulder"
      },
      {
        from: "nose",
        to: "right_shoulder"
      }
    ]
  };
  