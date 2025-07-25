#!/bin/bash
# Norvea SaaS - Backup PostgreSQL vers S3
set -e

DATE=$(date +"%Y-%m-%d_%H-%M-%S")
DUMP_FILE="/tmp/norvea_backup_$DATE.sql"

# Variables à configurer
PGUSER=${PGUSER:-norvea}
PGPASSWORD=${PGPASSWORD:-norvea}
PGDATABASE=${PGDATABASE:-norvea}
PGHOST=${PGHOST:-localhost}
S3_BUCKET=${S3_BUCKET:-s3://norvea-backups}
AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}

export PGPASSWORD

# Dump de la base
pg_dump -h $PGHOST -U $PGUSER $PGDATABASE > $DUMP_FILE

# Upload sur S3
aws s3 cp $DUMP_FILE $S3_BUCKET/

# Nettoyage
rm $DUMP_FILE

echo "Backup PostgreSQL Norvea terminé et uploadé sur $S3_BUCKET" 