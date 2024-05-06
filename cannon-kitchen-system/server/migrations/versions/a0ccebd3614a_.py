"""Added Order Table 

Revision ID: a0ccebd3614a
Revises: 
Create Date: 2024-05-05 15:25:56.903758

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a0ccebd3614a'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('order',
    sa.Column('order_id', sa.Integer(), nullable=False),
    sa.Column('order_data', sa.JSON(), nullable=True),
    sa.Column('scheduled_time', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('order_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('order')
    # ### end Alembic commands ###
