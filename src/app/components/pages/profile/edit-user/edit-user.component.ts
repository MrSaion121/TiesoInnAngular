import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../../../modules/material/material.module';


@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss'
})
export class EditUserComponent {
  form: FormGroup;
  roles = ['Cliente', 'Admin', 'Gerente', 'Recepcionista'];
  statuses = ['Activo', 'Inactivo'];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      username: [data.name, Validators.required],
      role: [data.role, Validators.required],
      email: [data.email || '', [Validators.required, Validators.email]],
      phone: [data.phone || '', Validators.required],
      status: [data.status, Validators.required],
    });
  }

  save(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
