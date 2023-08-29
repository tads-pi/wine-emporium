provider "aws" {
  region = "sa-east-1"
}

locals {
  tags = {
    project = "wine-emporium-pi4"
  }
}

resource "aws_s3_bucket" "wine_emporium_www" {
  bucket = "wine_emporium_www"

  website {
    index_document = "index.html"
  }

  acl = "public-read"
}

output "bucket_url" {
  value = aws_s3_bucket.wine_emporium_www.website_endpoint
}