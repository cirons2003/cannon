"""changed meal_date from string to date

Revision ID: 7f8ad1b1792d
Revises: fb0c7c19d509
Create Date: 2024-07-21 17:49:00.378847

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '7f8ad1b1792d'
down_revision = 'fb0c7c19d509'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('order', schema=None) as batch_op:
        batch_op.alter_column('meal_date',
               existing_type=mysql.INTEGER(),
               type_=sa.String(length=10),
               existing_nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('order', schema=None) as batch_op:
        batch_op.alter_column('meal_date',
               existing_type=sa.String(length=10),
               type_=mysql.INTEGER(),
               existing_nullable=False)

    # ### end Alembic commands ###