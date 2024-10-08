"""changed time to string


Revision ID: 41307a717729
Revises: c3420cff9e05
Create Date: 2024-06-23 18:20:12.450386

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '41307a717729'
down_revision = 'c3420cff9e05'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('order', schema=None) as batch_op:
        batch_op.alter_column('scheduled_time',
               existing_type=mysql.DATETIME(),
               type_=sa.String(length=128),
               existing_nullable=False,
               existing_server_default=sa.text('CURRENT_TIMESTAMP'), 
               server_default=None)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('order', schema=None) as batch_op:
        batch_op.alter_column('scheduled_time',
               existing_type=sa.String(length=128),
               type_=mysql.DATETIME(),
               existing_nullable=False,
               existing_server_default=sa.text('CURRENT_TIMESTAMP'))

    # ### end Alembic commands ###
