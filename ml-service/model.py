import torch
import torch.nn as nn
import timm

class TomatoDiseaseModel(nn.Module):

    def __init__(self,num_classes=10):

        super().__init__()

        self.backbone=timm.create_model(
            "efficientnet_b2",
            pretrained=False
        )

        num_features=self.backbone.classifier.in_features

        self.backbone.classifier=nn.Identity()

        self.classifier=nn.Sequential(
            nn.Dropout(0.3),
            nn.Linear(num_features,256),
            nn.ReLU(),
            nn.Dropout(0.2),
            nn.Linear(256,num_classes)
        )

    def forward(self,x):

        features=self.backbone(x)

        return self.classifier(features)