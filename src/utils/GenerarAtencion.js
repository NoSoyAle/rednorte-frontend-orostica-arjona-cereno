export const generarAtencionTxt = (
    cita,
    atencion
) => {

    const contenido = `
=================================
ATENCIÓN MÉDICA
=================================
Paciente:
${cita?.nombrePaciente || ""}
RUT:
${cita?.rutPaciente || ""}
Fecha:
${cita?.fecha || ""}
Hora:
${cita?.horaInicio || ""}
=================================
MOTIVO CONSULTA
=================================
${atencion.motivo}
=================================
DIAGNÓSTICO
=================================
${atencion.diagnostico}
=================================
MEDICAMENTOS
=================================
${atencion.medicamentos}
=================================
DERIVACIÓN
=================================
${atencion.derivacion}
=================================
INDICACIONES
=================================
${atencion.indicaciones}
=================================
LICENCIA MÉDICA
=================================
${atencion.licencia ? "SI" : "NO"}
${atencion.detalleLicencia}
=================================
COMENTARIOS
=================================
${atencion.comentarios}
`;
    const blob = new Blob(
        [contenido],
        {
            type: "text/plain;charset=utf-8"
        }
    );
    const url =
        window.URL.createObjectURL(blob);
    const link =
        document.createElement("a");
    link.href = url;
    link.download =
        `Atencion_${cita?.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
};